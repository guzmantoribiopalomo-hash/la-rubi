import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { EMAIL_SUBJECTS } from "@/lib/email/subjects";
import { validateContactForm } from "@/lib/validations/contact";
import { contactRateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ========================================
// CONFIGURACIÓN
// ========================================

const MAX_BODY_SIZE = 16_384;

const SUCCESS_MESSAGE =
  "Tu mensaje se ha enviado correctamente. ¡Gracias por contactar con nosotros!";

// ========================================
// RESPUESTAS JSON
// ========================================

function jsonResponse(
  message: string,
  status: number,
  success = false,
  headers?: HeadersInit
) {
  return NextResponse.json(
    {
      success,
      message,
    },
    {
      status,
      headers,
    }
  );
}

// ========================================
// ESCAPAR HTML
// ========================================

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => entities[character]
  );
}

function formatMessage(message: string): string {
  return escapeHtml(message).replace(/\r?\n/g, "<br />");
}

// ========================================
// IDENTIFICAR IP
// ========================================

function getClientIp(request: NextRequest): string | null {
  // En desarrollo local utilizamos una identificación fija.
  // Así podemos probar el rate limiting sin depender
  // de las cabeceras del proxy.

  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  // En producción únicamente debemos utilizar cabeceras
  // proporcionadas por un proxy de confianza.

  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();

    if (ip) {
      return ip;
    }
  }

  return null;
}

// ========================================
// COMPROBAR ORIGEN
// ========================================

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  const allowedOrigins = (
    process.env.CONTACT_ALLOWED_ORIGINS ?? ""
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  // Permitimos el desarrollo local.
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push(
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    );
  }

  return allowedOrigins.includes(origin);
}

// ========================================
// ENDPOINT POST
// ========================================

export async function POST(request: NextRequest) {
  try {
    // ========================================
    // 1. COMPROBAR ORIGEN
    // ========================================

    if (!isAllowedOrigin(request)) {
      return jsonResponse(
        "La solicitud no está autorizada.",
        403
      );
    }

    // ========================================
    // 2. COMPROBAR CONTENT-TYPE
    // ========================================

    const contentType =
      request.headers.get("content-type") ?? "";

    if (
      !contentType
        .toLowerCase()
        .includes("application/json")
    ) {
      return jsonResponse(
        "El formato de la solicitud no es válido.",
        415
      );
    }

    // ========================================
    // 3. COMPROBAR REDIS
    // ========================================

    if (!contactRateLimit) {
      console.error(
        "[CONTACT] Rate limiting no configurado."
      );

      return jsonResponse(
        "El servicio de contacto no está disponible temporalmente.",
        503
      );
    }

    // ========================================
    // 4. IDENTIFICAR IP
    // ========================================

    const clientIp = getClientIp(request);

    if (!clientIp) {
      console.error(
        "[CONTACT] No se ha podido identificar la IP."
      );

      return jsonResponse(
        "No hemos podido procesar tu solicitud.",
        503
      );
    }

    // ========================================
    // 5. RATE LIMITING
    // ========================================

    try {
      const { success, reset } =
        await contactRateLimit.limit(clientIp);

      if (!success) {
        const retryAfter = Math.max(
          1,
          Math.ceil((reset - Date.now()) / 1000)
        );

        return jsonResponse(
          "Has enviado demasiados mensajes. Espera unos minutos antes de volver a intentarlo.",
          429,
          false,
          {
            "Retry-After": String(retryAfter),
          }
        );
      }
    } catch (error) {
      console.error(
        "[CONTACT] Error al comprobar el rate limit:",
        error
      );

      return jsonResponse(
        "El servicio de contacto no está disponible temporalmente.",
        503
      );
    }

    // ========================================
    // 6. COMPROBAR TAMAÑO
    // ========================================

    const declaredLength = request.headers.get(
      "content-length"
    );

    if (declaredLength !== null) {
      const declaredSize = Number(declaredLength);

      if (
        Number.isFinite(declaredSize) &&
        declaredSize > MAX_BODY_SIZE
      ) {
        return jsonResponse(
          "La solicitud es demasiado grande.",
          413
        );
      }
    }

    const rawBody = await request.text();

    if (
      new TextEncoder().encode(rawBody).byteLength >
      MAX_BODY_SIZE
    ) {
      return jsonResponse(
        "La solicitud es demasiado grande.",
        413
      );
    }

    // ========================================
    // 7. INTERPRETAR JSON
    // ========================================

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse(
        "Los datos recibidos no son válidos.",
        400
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return jsonResponse(
        "Los datos del formulario no son válidos.",
        400
      );
    }

    const values = body as Record<string, unknown>;

    // ========================================
    // 8. HONEYPOT
    // ========================================

    if (
      typeof values.website === "string" &&
      values.website.trim() !== ""
    ) {
      // Simulamos éxito sin enviar ningún correo.

      return jsonResponse(
        SUCCESS_MESSAGE,
        200,
        true
      );
    }

    // ========================================
    // 9. VALIDAR FORMULARIO
    // ========================================

    const validation = validateContactForm(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Revisa los campos del formulario.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      email,
      message,
      marketingAccepted,
    } = validation.data;

    // ========================================
    // 10. CONFIGURACIÓN RESEND
    // ========================================

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;

    const recipients = (
      process.env.CONTACT_TO_EMAILS ?? ""
    )
      .split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean);

    if (
      !apiKey ||
      !from ||
      recipients.length === 0
    ) {
      console.error(
        "[CONTACT] Configuración de correo incompleta."
      );

      return jsonResponse(
        "El servicio de contacto no está disponible temporalmente.",
        503
      );
    }

    // ========================================
    // 11. PREPARAR EMAIL
    // ========================================

    const receivedAt = new Intl.DateTimeFormat(
      "es-ES",
      {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Madrid",
      }
    ).format(new Date());

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(
      phone || "No facilitado"
    );

    const html = `
      <div style="
        max-width: 640px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        color: #292929;
        line-height: 1.6;
      ">
        <div style="
          padding: 24px;
          background-color: #FAF7DF;
          border-bottom: 4px solid #772D32;
        ">
          <h1 style="margin: 0; font-size: 24px;">
            Churrería La Rubí
          </h1>

          <p style="margin-bottom: 0;">
            Nuevo mensaje desde el formulario de contacto
          </p>
        </div>

        <div style="padding: 24px;">
          <h2>Datos de contacto</h2>

          <p>
            <strong>Nombre:</strong> ${safeName}
          </p>

          <p>
            <strong>Email:</strong> ${safeEmail}
          </p>

          <p>
            <strong>Teléfono:</strong> ${safePhone}
          </p>

          <h2>Mensaje</h2>

          <div style="
            padding: 16px;
            background-color: #f7f7f7;
            border-radius: 8px;
            overflow-wrap: anywhere;
          ">
            ${formatMessage(message)}
          </div>

          <h2>Información adicional</h2>

          <p>
            <strong>Comunicaciones comerciales:</strong>
            ${marketingAccepted ? "Sí" : "No"}
          </p>

          <p>
            <strong>Fecha de recepción:</strong>
            ${receivedAt}
          </p>
        </div>

        <div style="
          padding: 16px 24px;
          background-color: #f5f5f5;
          font-size: 12px;
          color: #666;
        ">
          Este correo se ha generado automáticamente
          desde el formulario de contacto de
          Churrería La Rubí.
        </div>
      </div>
    `;

    // ========================================
    // 12. ENVIAR CORREO
    // ========================================

    console.log("[CONTACT] Destinatarios:", recipients);
    console.log("[CONTACT] Remitente:", from);
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email,
      subject: EMAIL_SUBJECTS.contact,
      html,
    });

    if (error) {
      console.error(
        "[CONTACT] Error de Resend:",
        error
      );

      return jsonResponse(
        "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde.",
        502
      );
    }

    console.info(
      "[CONTACT] Correo aceptado por Resend:",
      data?.id
    );

    return jsonResponse(
      SUCCESS_MESSAGE,
      200,
      true
    );
  } catch (error) {
    console.error(
      "[CONTACT] Error inesperado:",
      error
    );

    return jsonResponse(
      "Ha ocurrido un error inesperado. Inténtalo de nuevo.",
      500
    );
  }
}