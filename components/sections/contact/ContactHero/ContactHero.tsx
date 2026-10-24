"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./ContactHero.module.scss";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  privacy: boolean;
  marketing: boolean;
  website: string;
};

type SubmitStatus = "idle" | "success" | "error";

type ContactApiResponse = {
  success: boolean;
  message?: string;
};

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
  privacy: false,
  marketing: false,
  website: "",
};

export default function ContactHero() {
  // ========================================
  // ESTADOS DEL FORMULARIO
  // ========================================

  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const [submitMessage, setSubmitMessage] = useState("");

  // ========================================
  // ACTUALIZACIÓN DE CAMPOS
  // ========================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    const fieldValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;

    setFormData((previous) => ({
      ...previous,
      [name]: fieldValue,
    }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  // ========================================
  // ENVÍO DEL FORMULARIO
  // ========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          privacyAccepted: formData.privacy,
          marketingAccepted: formData.marketing,

          // Protección antispam: honeypot
          website: formData.website,
        }),
      });

      const result: ContactApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        setSubmitStatus("error");

        setSubmitMessage(
          result.message ||
            "No hemos podido enviar tu mensaje. Inténtalo de nuevo."
        );

        return;
      }

      // ========================================
      // ENVÍO CORRECTO
      // ========================================

      setSubmitStatus("success");

      setSubmitMessage(
        result.message ||
          "Tu mensaje se ha enviado correctamente."
      );

      setFormData({ ...initialFormData });
    } catch (error) {
      console.error(
        "[CONTACT] Error al enviar el formulario:",
        error
      );

      setSubmitStatus("error");

      setSubmitMessage(
        "No hemos podido conectar con el servidor. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // RENDERIZADO
  // ========================================

  return (
    <section
      className={styles.hero}
      aria-labelledby="contact-hero-title"
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div
        className={styles.background}
        aria-hidden="true"
      >
        <Image
          src="/images/contact/hero/contacto-1A.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 0px, 100vw"
          className={`${styles.backgroundImage} ${styles.desktopImage}`}
        />

        <Image
          src="/images/contact/hero/contacto-1B.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className={`${styles.backgroundImage} ${styles.mobileImage}`}
        />
      </div>

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* ========================================
            INTRODUCCIÓN
        ======================================== */}

        <div className={styles.intro}>
          <h1
            id="contact-hero-title"
            className={styles.title}
          >
            Qué bueno
            <br />
            verte por <em>aquí</em>
          </h1>

          <p className={styles.description}>
            Si tienes alguna pregunta, propuesta o
            simplemente quieres saludarnos, estaremos
            encantados de escucharte.
          </p>

          <p className={styles.description}>
            Rellena el formulario y te responderemos lo
            antes posible. También puedes encontrarnos
            en nuestro local o a través de los siguientes
            medios de contacto.
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
          >
            {/* ========================================
                HONEYPOT ANTISPAM
            ======================================== */}

            <div
              className={styles.honeypot}
              aria-hidden="true"
            >
              <label htmlFor="contact-website">
                Página web
              </label>

  <input
    id="contact-company-fax"
    name="website"
    type="text"
    value={formData.website}
    onChange={handleChange}
    tabIndex={-1}
    autoComplete="new-password"
    data-lpignore="true"
    data-1p-ignore="true"
  />
            </div>

            {/* ========================================
                NOMBRE
            ======================================== */}

            <div className={styles.field}>
              <label
                htmlFor="contact-name"
                className={styles.srOnly}
              >
                Nombre y apellidos
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Nombre y apellidos*"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={120}
                disabled={isSubmitting}
                className={styles.input}
              />
            </div>

            {/* ========================================
                TELÉFONO + EMAIL
            ======================================== */}

            <div className={styles.fieldsRow}>
              <div className={styles.field}>
                <label
                  htmlFor="contact-phone"
                  className={styles.srOnly}
                >
                  Teléfono
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Teléfono"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={25}
                  disabled={isSubmitting}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label
                  htmlFor="contact-email"
                  className={styles.srOnly}
                >
                  Correo electrónico
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email*"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  disabled={isSubmitting}
                  className={styles.input}
                />
              </div>
            </div>

            {/* ========================================
                MENSAJE
            ======================================== */}

            <div className={styles.field}>
              <label
                htmlFor="contact-message"
                className={styles.srOnly}
              >
                Mensaje
              </label>

              <textarea
                id="contact-message"
                name="message"
                placeholder="Mensaje*"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                disabled={isSubmitting}
                className={styles.textarea}
              />
            </div>

            {/* ========================================
                CONSENTIMIENTOS
            ======================================== */}

            <div className={styles.consents}>
              {/* COMUNICACIONES COMERCIALES */}

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={formData.marketing}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={styles.checkbox}
                />

                <span>
                  Acepto recibir comunicaciones
                  comerciales de productos y servicios
                  de Churrería La Rubí.
                </span>
              </label>

              {/* PRIVACIDAD */}

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={styles.checkbox}
                />

                <span>
                  Autorizo la recogida y el tratamiento de
                  mis datos personales facilitados en el
                  presente formulario para los fines
                  descritos en el{" "}
                  <Link
                    href="/aviso-legal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.legalLink}
                  >
                    aviso legal
                  </Link>{" "}
                  y la{" "}
                  <Link
                    href="/politica-de-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.legalLink}
                  >
                    política de privacidad
                  </Link>
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
              <span>
                {isSubmitting
                  ? "Enviando mensaje..."
                  : "Enviar mensaje"}
              </span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            {/* ========================================
                RESULTADO DEL ENVÍO
            ======================================== */}

            {submitMessage && (
              <p
                className={`${styles.formFeedback} ${
                  submitStatus === "success"
                    ? styles.formFeedbackSuccess
                    : styles.formFeedbackError
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