"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import styles from "./FranchiseApplicationForm.module.scss";

const autonomousCommunities = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Islas Baleares",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Comunidad de Madrid",
  "Región de Murcia",
  "Navarra",
  "País Vasco",
  "Ceuta",
  "Melilla",
];

type SubmitStatus = "idle" | "success" | "error";

interface FranchiseFormState {
  name: string;
  phone: string;
  community: string;
  email: string;
  ownFunds: string;
  hospitalityExperience: string;
  franchiseExperience: string;
  marketingAccepted: boolean;
  privacyAccepted: boolean;
  website: string;
}

const initialFormData: FranchiseFormState = {
  name: "",
  phone: "",
  community: "",
  email: "",
  ownFunds: "",
  hospitalityExperience: "",
  franchiseExperience: "",
  marketingAccepted: false,
  privacyAccepted: false,
  website: "",
};

function translateAnswer(value: string): string {
  switch (value) {
    case "yes":
      return "Sí";

    case "no":
      return "No";

    case "partial":
      return "Parcialmente";

    default:
      return value;
  }
}

export default function FranchiseApplicationForm() {
  // ========================================
  // ESTADOS DEL FORMULARIO
  // ========================================

  const [formData, setFormData] =
    useState<FranchiseFormState>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const [submitMessage, setSubmitMessage] = useState("");

  // ========================================
  // ACTUALIZACIÓN DE CAMPOS
  // ========================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    const newValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;

    setFormData((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    // Eliminamos mensajes anteriores al modificar el formulario.
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  // ========================================
  // ENVÍO DEL FORMULARIO
  // ========================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Adaptamos los nombres y valores a la API.
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),

        // La API utiliza "region".
        region: formData.community,

        email: formData.email.trim(),

        ownFunds: translateAnswer(formData.ownFunds),

        hospitalityExperience: translateAnswer(
          formData.hospitalityExperience
        ),

        franchiseExperience: translateAnswer(
          formData.franchiseExperience
        ),

        marketingAccepted: formData.marketingAccepted,

        privacyAccepted: formData.privacyAccepted,

        // Campo antispam.
        website: formData.website,
      };

      const response = await fetch("/api/franchise", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // ========================================
      // ERROR DEL SERVIDOR
      // ========================================

      if (!response.ok || !result.success) {
        setSubmitStatus("error");

        setSubmitMessage(
          result.message ||
            "No hemos podido enviar tu solicitud. Inténtalo de nuevo."
        );

        return;
      }

      // ========================================
      // ENVÍO CORRECTO
      // ========================================

      setSubmitStatus("success");

      setSubmitMessage(
        result.message ||
          "Tu solicitud se ha enviado correctamente. Nos pondremos en contacto contigo lo antes posible."
      );

      // Limpiamos los campos.
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error(
        "[FRANCHISE] Error al enviar el formulario:",
        error
      );

      setSubmitStatus("error");

      setSubmitMessage(
        "No hemos podido conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <section
      className={styles.section}
      id="solicitud-franquicia"
    >
      <div className={styles.container}>
        {/* ========================================
            ILUSTRACIÓN
        ======================================== */}

        <div className={styles.illustration}>
          <Image
            src="/images/franchise-application/form/abre-tu-franquicia-3.webp"
            alt="Ilustración de la fachada de Churrería La Rubí"
            fill
            sizes="(max-width: 1024px) 0px, 35vw"
            className={styles.illustrationImage}
          />
        </div>

        {/* ========================================
            CONTENIDO
        ======================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Cuéntanos tu proyecto
          </span>

          <h2 className={styles.title}>
            Hablemos
            <br />
            de tu franquicia
          </h2>

          <p className={styles.description}>
            Rellena el formulario y nuestro equipo te contactará
            para darte toda la información sobre el modelo de
            negocio, las condiciones y los próximos pasos.
          </p>

          <span
            className={styles.decorativeLine}
            aria-hidden="true"
          />
        </div>

        {/* ========================================
            FORMULARIO
        ======================================== */}

        <div className={styles.formWrapper}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
          >
            {/* HONEYPOT */}

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* NOMBRE */}

            <input
              type="text"
              name="name"
              placeholder="Nombre y apellidos*"
              aria-label="Nombre y apellidos"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              className={styles.input}
              disabled={isSubmitting}
            />

            {/* TELÉFONO Y COMUNIDAD */}

            <div className={styles.formRow}>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono*"
                aria-label="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                className={styles.input}
                disabled={isSubmitting}
              />

              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
                required
                className={styles.select}
                aria-label="Comunidad autónoma"
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Comunidad autónoma*
                </option>

                {autonomousCommunities.map((community) => (
                  <option
                    key={community}
                    value={community}
                  >
                    {community}
                  </option>
                ))}
              </select>
            </div>

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email*"
              aria-label="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={254}
              autoComplete="email"
              className={styles.input}
              disabled={isSubmitting}
            />

            {/* FONDOS PROPIOS */}

            <select
              name="ownFunds"
              value={formData.ownFunds}
              onChange={handleChange}
              required
              className={styles.select}
              aria-label="Disponibilidad de fondos propios"
              disabled={isSubmitting}
            >
              <option value="" disabled>
                ¿Dispones de fondos propios para acometer la inversión?*
              </option>

              <option value="yes">Sí</option>
              <option value="no">No</option>
              <option value="partial">Parcialmente</option>
            </select>

            {/* EXPERIENCIA EN RESTAURACIÓN */}

            <select
              name="hospitalityExperience"
              value={formData.hospitalityExperience}
              onChange={handleChange}
              required
              className={styles.select}
              aria-label="Experiencia previa en restauración"
              disabled={isSubmitting}
            >
              <option value="" disabled>
                ¿Tienes experiencia previa en restauración?*
              </option>

              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>

            {/* EXPERIENCIA EN FRANQUICIAS */}

            <select
              name="franchiseExperience"
              value={formData.franchiseExperience}
              onChange={handleChange}
              required
              className={styles.select}
              aria-label="Experiencia previa en franquicias"
              disabled={isSubmitting}
            >
              <option value="" disabled>
                ¿Tienes experiencia previa en franquicias?*
              </option>

              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>

            {/* ========================================
                CONSENTIMIENTOS
            ======================================== */}

            <div className={styles.checkboxGroup}>
              {/* MARKETING */}

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="marketingAccepted"
                  checked={formData.marketingAccepted}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />

                <span>
                  Acepto recibir comunicaciones comerciales de
                  productos y servicios de Churrería La Rubí.
                </span>
              </label>

              {/* PRIVACIDAD */}

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />

                <span>
                  Autorizo la recogida y el tratamiento de mis datos
                  personales facilitados en el presente formulario
                  para los fines descritos en el{" "}
                  <a href="/aviso-legal">
                    aviso legal
                  </a>{" "}
                  y la{" "}
                  <a href="/politica-de-privacidad">
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* ========================================
                BOTÓN DE ENVÍO
            ======================================== */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enviando solicitud..."
                : "Enviar solicitud"}

              <span aria-hidden="true">→</span>
            </button>

            {/* ========================================
                MENSAJES DE RESPUESTA
            ======================================== */}

            {submitMessage && (
              <p
                className={`${styles.feedback} ${
                  submitStatus === "success"
                    ? styles.feedbackSuccess
                    : styles.feedbackError
                }`}
                role={
                  submitStatus === "error"
                    ? "alert"
                    : "status"
                }
                aria-live="polite"
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}