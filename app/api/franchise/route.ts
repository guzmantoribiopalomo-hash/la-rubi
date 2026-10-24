import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { EMAIL_SUBJECTS } from "@/lib/email/subjects";
import { validateFranchiseForm } from "@/lib/validations/franchise";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "la-rubi:franchise",
});

export const dynamic = "force-dynamic";

const MAX_BODY_SIZE = 16_384;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character] ?? character;
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Comprobar el tamaño de la solicitud
    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "La solicitud es demasiado grande.",
        },
        { status: 413 }
      );
    }

    // 2. Convertir el contenido a JSON
    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Los datos enviados no son válidos.",
        },
        { status: 400 }
      );
    }

    if (
  typeof body !== "object" ||
  body === null ||
  Array.isArray(body)
) {
  return NextResponse.json(
    {
      success: false,
      message: "Los datos enviados no son válidos.",
    },
    { status: 400 }
  );
}

const requestData = body as Record<string, unknown>;

if (
  typeof requestData.website !== "string" ||
  requestData.website.length > 0
) {
  // Respuesta neutra para no revelar el mecanismo antispam.
  return NextResponse.json({
    success: true,
    message: "Tu solicitud se ha recibido correctamente.",
  });
}

const forwardedFor = request.headers.get("x-forwarded-for");

const ip = forwardedFor?.split(",")[0]?.trim();

if (!ip) {
  return NextResponse.json(
    {
      success: false,
      message: "No hemos podido verificar la solicitud.",
    },
    { status: 400 }
  );
}

try {
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const retryAfter = Math.max(
      1,
      Math.ceil((reset - Date.now()) / 1000)
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Has realizado demasiadas solicitudes. Inténtalo de nuevo más tarde.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
        },
      }
    );
  }
} catch (error) {
  console.error(
    "[FRANCHISE] Error al comprobar el límite de solicitudes:",
    error
  );

  return NextResponse.json(
    {
      success: false,
      message:
        "El servicio no está disponible temporalmente. Inténtalo más tarde.",
    },
    { status: 503 }
  );
}

    // 3. Validar los campos
    const validation = validateFranchiseForm(body);

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
      region,
      email,
      ownFunds,
      hospitalityExperience,
      franchiseExperience,
      marketingAccepted,
    } = validation.data;

    // 4. Obtener configuración de Resend
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;

    const recipients = (process.env.CONTACT_TO_EMAILS ?? "")
      .split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean);

    if (!apiKey || !from || recipients.length === 0) {
      console.error(
        "[FRANCHISE] Faltan variables de entorno para enviar correos."
      );

      return NextResponse.json(
        {
          success: false,
          message: "El servicio de correo no está disponible.",
        },
        { status: 503 }
      );
    }

    // 5. Preparar los datos para el HTML
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeRegion = escapeHtml(region);
    const safeEmail = escapeHtml(email);
    const safeOwnFunds = escapeHtml(ownFunds);
    const safeHospitalityExperience = escapeHtml(
      hospitalityExperience
    );
    const safeFranchiseExperience = escapeHtml(
      franchiseExperience
    );

    const date = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    // 6. Construir el correo
    const html = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
        </head>

        <body style="
          margin: 0;
          padding: 30px 15px;
          background-color: #f5f3ed;
          font-family: Arial, Helvetica, sans-serif;
          color: #292929;
        ">

          <div style="
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          ">

            <div style="
              padding: 32px;
              background-color: #faf7df;
              text-align: center;
            ">

              <h1 style="
                margin: 0;
                color: #a30e29;
                font-size: 30px;
                font-family: Georgia, serif;
              ">
                CHURRERÍA LA RUBÍ
              </h1>

              <p style="
                margin: 12px 0 0;
                color: #392419;
                font-size: 15px;
              ">
                Nueva solicitud de franquicia
              </p>

            </div>

            <div style="padding: 32px;">

              <h2 style="
                margin-top: 0;
                color: #a30e29;
                font-size: 21px;
              ">
                Datos del interesado
              </h2>

              <table style="
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                line-height: 1.6;
              ">

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Nombre y apellidos
                  </td>
                  <td style="padding: 10px 0;">
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Teléfono
                  </td>
                  <td style="padding: 10px 0;">
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Email
                  </td>
                  <td style="padding: 10px 0;">
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Comunidad autónoma
                  </td>
                  <td style="padding: 10px 0;">
                    ${safeRegion}
                  </td>
                </tr>

              </table>

              <hr style="
                border: none;
                border-top: 1px solid #e7e1d9;
                margin: 26px 0;
              " />

              <h2 style="
                color: #a30e29;
                font-size: 21px;
              ">
                Perfil del candidato
              </h2>

              <p>
                <strong>¿Dispone de fondos propios?</strong><br />
                ${safeOwnFunds}
              </p>

              <p>
                <strong>¿Tiene experiencia en restauración?</strong><br />
                ${safeHospitalityExperience}
              </p>

              <p>
                <strong>¿Tiene experiencia en franquicias?</strong><br />
                ${safeFranchiseExperience}
              </p>

              <hr style="
                border: none;
                border-top: 1px solid #e7e1d9;
                margin: 26px 0;
              " />

              <h2 style="
                color: #a30e29;
                font-size: 21px;
              ">
                Consentimientos
              </h2>

              <p>
                <strong>Comunicaciones comerciales:</strong>
                ${marketingAccepted ? "Sí" : "No"}
              </p>

              <p>
                <strong>Política de privacidad:</strong>
                Aceptada
              </p>

            </div>

            <div style="
              padding: 20px 32px;
              background-color: #faf7df;
              text-align: center;
              font-size: 12px;
              color: #666666;
            ">
              Solicitud recibida el ${date}
              <br />
              Formulario de franquicias · Churrería La Rubí
            </div>

          </div>

        </body>
      </html>
    `;

    // 7. Enviar el correo
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email,
      subject: EMAIL_SUBJECTS.franchise,
      html,
    });

    if (error) {
      console.error("[FRANCHISE] Error de Resend:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "No hemos podido enviar tu solicitud. Inténtalo de nuevo más tarde.",
        },
        { status: 502 }
      );
    }

    console.info(
      "[FRANCHISE] Solicitud aceptada por Resend:",
      data?.id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Tu solicitud se ha enviado correctamente. Nos pondremos en contacto contigo lo antes posible.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FRANCHISE] Error inesperado:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}