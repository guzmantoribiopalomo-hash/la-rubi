// lib/validations/contact.ts

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
}

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string>
>;

export type ContactValidationResult =
  | {
      success: true;
      data: ContactFormData;
    }
  | {
      success: false;
      errors: ContactFormErrors;
    };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^[+]?[0-9\s().-]{7,25}$/;

export function validateContactForm(
  input: unknown
): ContactValidationResult {
  const errors: ContactFormErrors = {};

  // Comprobamos que recibimos un objeto válido.
  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return {
      success: false,
      errors: {
        message: "Los datos del formulario no son válidos.",
      },
    };
  }

  const values = input as Record<string, unknown>;

  // ========================================
  // NOMBRE
  // ========================================

  const name =
    typeof values.name === "string"
      ? values.name.trim()
      : "";

  if (name.length < 2 || name.length > 120) {
    errors.name =
      "El nombre debe tener entre 2 y 120 caracteres.";
  }

  // ========================================
  // TELÉFONO
  // ========================================

  const phone =
    typeof values.phone === "string"
      ? values.phone.trim()
      : "";

  if (phone && !PHONE_REGEX.test(phone)) {
    errors.phone =
      "Introduce un número de teléfono válido.";
  }

  // ========================================
  // EMAIL
  // ========================================

  const email =
    typeof values.email === "string"
      ? values.email.trim()
      : "";

  if (
    email.length > 254 ||
    !EMAIL_REGEX.test(email)
  ) {
    errors.email =
      "Introduce una dirección de correo válida.";
  }

  // ========================================
  // MENSAJE
  // ========================================

  const message =
    typeof values.message === "string"
      ? values.message.trim()
      : "";

  if (
    message.length < 10 ||
    message.length > 5000
  ) {
    errors.message =
      "El mensaje debe tener entre 10 y 5000 caracteres.";
  }

  // ========================================
  // PRIVACIDAD
  // ========================================

  const privacyAccepted =
    values.privacyAccepted === true;

  if (!privacyAccepted) {
    errors.privacyAccepted =
      "Debes aceptar la política de privacidad.";
  }

  // ========================================
  // COMUNICACIONES COMERCIALES
  // ========================================

  const marketingAccepted =
    values.marketingAccepted === true;

  // ========================================
  // RESULTADO
  // ========================================

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: {
      name,
      phone,
      email,
      message,
      privacyAccepted,
      marketingAccepted,
    },
  };
}