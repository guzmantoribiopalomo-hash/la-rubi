"use client";

import { useState, type FormEvent } from "react";
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
};

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
  privacy: false,
  marketing: false,
};

export default function ContactHero() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formMessage, setFormMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    // El envío real se implementará cuando
    // desarrollemos la API de contacto.

    setFormMessage(
      "El formulario está preparado. El envío de mensajes estará disponible próximamente."
    );
  };

  return (
    <section
      className={styles.hero}
      aria-labelledby="contact-hero-title"
    >
      {/* BACKGROUND */}

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
        {/* INTRODUCTION */}

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

        {/* CONTACT FORM */}

        <div className={styles.formWrapper}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            {/* NAME */}

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
                maxLength={120}
                className={styles.input}
              />
            </div>

            {/* PHONE + EMAIL */}

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
                  className={styles.input}
                />
              </div>
            </div>

            {/* MESSAGE */}

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
                className={styles.textarea}
              />
            </div>

            {/* CONSENTS */}

            <div className={styles.consents}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={formData.marketing}
                  onChange={handleChange}
                  className={styles.checkbox}
                />

                <span>
                  Acepto recibir comunicaciones
                  comerciales de productos y servicios
                  de Churrería La Rubí.
                </span>
              </label>

<label className={styles.checkboxLabel}>
  <input
    type="checkbox"
    name="privacy"
    checked={formData.privacy}
    onChange={handleChange}
    required
    className={styles.checkbox}
  />

  <span>
    Autorizo la recogida y el tratamiento de mis datos
    personales facilitados en el presente formulario
    para los fines descritos en el{" "}
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

            {/* SUBMIT */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "ENVIANDO..."
                  : "ENVIAR MENSAJE"}
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

            {/* FORM FEEDBACK */}

            {formMessage && (
              <p
                className={styles.formMessage}
                role="status"
                aria-live="polite"
              >
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}