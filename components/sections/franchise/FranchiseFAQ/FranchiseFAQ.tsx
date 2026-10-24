"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import styles from "./FranchiseFAQ.module.scss";

/* ========================================
   FAQ DATA
======================================== */

const faqs = [
  {
    id: "investment",
    question: "¿Qué incluye la inversión?",
    answer:
      "La inversión contempla los principales elementos necesarios para poner en marcha el negocio, como la adecuación del local, el equipamiento y la formación inicial. El alcance definitivo se detallará en la propuesta de franquicia.",
  },
  {
    id: "location",
    question: "¿Qué tipo de local necesito?",
    answer:
      "Buscamos locales con buena visibilidad, preferiblemente en zonas de paso y con características adecuadas para desarrollar la actividad. Estudiaremos cada ubicación de forma individual.",
  },
  {
    id: "opening",
    question: "¿Cuánto tiempo se tarda en abrir?",
    answer:
      "El plazo dependerá de factores como el estado del local, las licencias necesarias y las obras de adecuación. Durante la planificación estableceremos un calendario adaptado a cada proyecto.",
  },
  {
    id: "training",
    question: "¿Recibiré formación?",
    answer:
      "Sí. Nuestro modelo contempla formación sobre la elaboración de los productos, los procesos de trabajo y la gestión diaria del establecimiento.",
  },
  {
    id: "visit",
    question: "¿Puedo visitar una churrería en funcionamiento?",
    answer:
      "Puedes solicitar información sobre la posibilidad de conocer nuestro establecimiento y descubrir de primera mano cómo trabajamos.",
  },
];

/* ========================================
   FRANCHISE FAQ
======================================== */

export default function FranchiseFAQ() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaq((current) => (current === id ? null : id));
  };

  return (
    <section
      className={styles.faq}
      aria-labelledby="franchise-faq-title"
    >
      <div className={styles.container}>
        {/* TITLE */}

        <h2
          id="franchise-faq-title"
          className={styles.title}
        >
          Preguntas
          <br />
          frecuentes
        </h2>

        {/* ACCORDION */}

        <div className={styles.accordion}>
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;

            return (
              <div
                key={faq.id}
                className={`${styles.item} ${
                  isOpen ? styles.itemOpen : ""
                }`}
              >
                <h3 className={styles.questionHeading}>
                  <button
                    type="button"
                    className={styles.question}
                    id={`faq-question-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className={styles.questionText}>
                      {faq.question}
                    </span>

                    <span
                      className={styles.iconWrapper}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus
                          className={styles.icon}
                          strokeWidth={1.8}
                        />
                      ) : (
                        <Plus
                          className={styles.icon}
                          strokeWidth={1.8}
                        />
                      )}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={styles.answer}
                  hidden={!isOpen}
                >
                  <p className={styles.answerText}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}