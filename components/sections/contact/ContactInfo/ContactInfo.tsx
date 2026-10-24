import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

import styles from "./ContactInfo.module.scss";

const contactDetails = [
  {
    id: "address",
    label: "Dirección",
    lines: [
      "Calle Empedrada, 13",
      "45720 Camuñas (Toledo)",
    ],
    icon: MapPin,
  },
  {
    id: "phone",
    label: "Teléfono",
    lines: ["Próximamente"],
    icon: Phone,
  },
  {
    id: "email",
    label: "Email",
    lines: ["Próximamente"],
    icon: Mail,
  },
  {
    id: "hours",
    label: "Horario",
    lines: [
      "Sábados y domingos",
      "7:30 – 12:00",
    ],
    icon: Clock3,
  },
];

export default function ContactInfo() {
  return (
    <section
      className={styles.info}
      aria-labelledby="contact-info-title"
    >
      <div className={styles.container}>

        {/* LEFT COLUMN */}

        <div className={styles.intro}>
          <h2
            id="contact-info-title"
            className={styles.title}
          >
            También puedes
            <br />
            encontrarnos
          </h2>

          <p className={styles.description}>
            Nos encantaría recibirte en nuestro local
            o atenderte por teléfono o email.
          </p>

          <span
            className={styles.decorativeLine}
            aria-hidden="true"
          />
        </div>

        {/* CENTER COLUMN */}

        <div className={styles.details}>
          {contactDetails.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.id}
                className={styles.detail}
              >
                <span
                  className={styles.iconWrapper}
                  aria-hidden="true"
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </span>

                <div className={styles.detailContent}>
                  <h3 className={styles.detailTitle}>
                    {detail.label}
                  </h3>

                  <p className={styles.detailText}>
                    {detail.lines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < detail.lines.length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN */}

        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/contact/info/contacto-2.webp"
              alt="Ilustración de la fachada de Churrería La Rubí"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className={styles.image}
            />
          </div>

          <div
            className={styles.handwritten}
            aria-hidden="true"
          >
            <span>
              Te esperamos
              <br />
              en nuestro local
            </span>

            <svg
              viewBox="0 0 100 65"
              fill="none"
              className={styles.handwrittenArrow}
            >
              <path
                d="M82 5C85 25 65 40 18 52"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M29 40L18 52L34 55"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}