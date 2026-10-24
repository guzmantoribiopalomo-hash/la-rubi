import Image from "next/image";
import Link from "next/link";

import styles from "./FranchiseInvestment.module.scss";

/* ========================================
   INVESTMENT DATA
======================================== */

const investmentItems = [
  {
    id: "initial-investment",
    title: "Inversión necesaria",
    value: "Desde 150.000 €",
    description:
      "Incluye obra, equipamiento, formación inicial y apoyo en la apertura.",
    image: "/images/franchise/investment/franquicias-3-1.webp",
    imageAlt: "Ilustración artesanal de una taza de café con granos",
  },
  {
    id: "entry-fee",
    title: "Canon de entrada",
    value: "18.000 €",
    description:
      "Acceso a la marca, know-how, formación y acompañamiento continuo.",
    image: "/images/franchise/investment/franquicias-3-2.webp",
    imageAlt: "Ilustración artesanal de rosquillas",
  },
  {
    id: "royalty",
    title: "Royalty",
    value: "3,5 % sobre las ventas",
    description:
      "Un modelo justo, alineado con tu crecimiento.",
    image: "/images/franchise/investment/franquicias-3-3.webp",
    imageAlt: "Ilustración artesanal de pan y espigas de trigo",
  },
];

/* ========================================
   FRANCHISE INVESTMENT
======================================== */

export default function FranchiseInvestment() {
  return (
    <section
      className={styles.investment}
      aria-labelledby="franchise-investment-title"
    >
      <div className={styles.container}>

        {/* ========================================
            INTRODUCTION
        ======================================== */}

        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            INVERSIÓN Y REQUISITOS
          </span>

          <h2
            id="franchise-investment-title"
            className={styles.title}
          >
            Claro, sencillo
            <br />
            y sin sorpresas
          </h2>

          <p className={styles.description}>
            Te ofrecemos un modelo de franquicia transparente,
            con una inversión ajustada y todo el apoyo necesario
            para que tu churrería La Rubí sea un éxito.
          </p>

          <Link
            href="/abre-tu-franquicia"
            className={styles.button}
          >
            SOLICITAR INFORMACIÓN

            <svg
              width="16"
              height="16"
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
          </Link>
        </div>

        {/* ========================================
            INVESTMENT ITEMS
        ======================================== */}

        <div className={styles.items}>
          {investmentItems.map((item) => (
            <article
              key={item.id}
              className={styles.item}
            >
              {/* ILLUSTRATION */}

              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 767px) 110px, (max-width: 1023px) 160px, 220px"
                  className={styles.image}
                />
              </div>

              {/* INFORMATION */}

              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>
                  {item.title}
                </h3>

                <p className={styles.itemValue}>
                  {item.value}
                </p>

                <p className={styles.itemDescription}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}