import Image from "next/image";
import { Check } from "lucide-react";

import styles from "./FranchiseRequirements.module.scss";

/* ========================================
   REQUIREMENTS DATA
======================================== */

const requirements = [
  {
    id: "location",
    text: "Local en zona de paso o con buena visibilidad.",
  },
  {
    id: "management",
    text: "Aptitud para la gestión del negocio.",
  },
  {
    id: "commitment",
    text: "Compromiso con la calidad y la atención al cliente.",
  },
  {
    id: "long-term",
    text: "Interés por formar parte de un proyecto a largo plazo.",
  },
];

/* ========================================
   FRANCHISE REQUIREMENTS
======================================== */

export default function FranchiseRequirements() {
  return (
    <section
      className={styles.requirements}
      aria-labelledby="franchise-requirements-title"
    >
      <div className={styles.container}>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>
          <h2
            id="franchise-requirements-title"
            className={styles.title}
          >
            Requisitos
            <br />
            principales
          </h2>

          <ul className={styles.list}>
            {requirements.map((requirement) => (
              <li
                key={requirement.id}
                className={styles.item}
              >
                <span
                  className={styles.check}
                  aria-hidden="true"
                >
                  <Check
                    size={16}
                    strokeWidth={2.5}
                  />
                </span>

                <span className={styles.itemText}>
                  {requirement.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ========================================
            ILLUSTRATION
        ======================================== */}

        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/home/history/pet01.webp"
              alt="Ilustración artesanal de una aceitera tradicional de La Rubí"
              fill
              sizes="(max-width: 767px) 220px, (max-width: 1199px) 180px, 240px"
              className={styles.image}
            />
          </div>

          <div
            className={styles.handwritten}
            aria-hidden="true"
          >
            <span>
              Aquí empezamos
              <br />
              todo
            </span>

            <svg
              className={styles.handwrittenArrow}
              viewBox="0 0 100 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M92 6C70 6 75 31 52 34C32 37 28 51 9 54"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M21 43L9 54L24 59"
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