export interface FranchiseFormData {
  name: string;
  phone: string;
  region: string;
  email: string;
  ownFunds: string;
  hospitalityExperience: string;
  franchiseExperience: string;
  marketingAccepted: boolean;
  privacyAccepted: boolean;
}

export type FranchiseFormErrors = Partial<
  Record<keyof FranchiseFormData, string>
>;

export type FranchiseValidationResult =
  | {
      success: true;
      data: FranchiseFormData;
    }
  | {
      success: false;
      errors: FranchiseFormErrors;
    };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[0-9\s().-]{7,25}$/;

export function validateFranchiseForm(
  input: unknown
): FranchiseValidationResult {
  const errors: FranchiseFormErrors = {};

  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return {
      success: false,
      errors: {
        name: "Los datos del formulario no son válidos.",
      },
    };
  }

  const values = input as Record<string, unknown>;

  const name =
    typeof values.name === "string" ? values.name.trim() : "";

  const phone =
    typeof values.phone === "string" ? values.phone.trim() : "";

  const region =
    typeof values.region === "string" ? values.region.trim() : "";

  const email =
    typeof values.email === "string" ? values.email.trim() : "";

  const ownFunds =
    typeof values.ownFunds === "string"
      ? values.ownFunds.trim()
      : "";

  const hospitalityExperience =
    typeof values.hospitalityExperience === "string"
      ? values.hospitalityExperience.trim()
      : "";

  const franchiseExperience =
    typeof values.franchiseExperience === "string"
      ? values.franchiseExperience.trim()
      : "";

  const marketingAccepted = values.marketingAccepted === true;
  const privacyAccepted = values.privacyAccepted === true;

  if (name.length < 2 || name.length > 120) {
    errors.name = "Introduce un nombre válido.";
  }

  if (!PHONE_REGEX.test(phone)) {
    errors.phone = "Introduce un teléfono válido.";
  }

  if (!region || region.length > 100) {
    errors.region = "Selecciona una comunidad autónoma.";
  }

  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = "Introduce un correo electrónico válido.";
  }

if (!["Sí", "No", "Parcialmente"].includes(ownFunds)) {
  errors.ownFunds = "Selecciona una opción.";
}

  if (!["Sí", "No"].includes(hospitalityExperience)) {
    errors.hospitalityExperience = "Selecciona una opción.";
  }

  if (!["Sí", "No"].includes(franchiseExperience)) {
    errors.franchiseExperience = "Selecciona una opción.";
  }

  if (!privacyAccepted) {
    errors.privacyAccepted =
      "Debes aceptar la política de privacidad.";
  }

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
      region,
      email,
      ownFunds,
      hospitalityExperience,
      franchiseExperience,
      marketingAccepted,
      privacyAccepted,
    },
  };
}