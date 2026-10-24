import Image from "next/image";
import Link from "next/link";

import styles from "./FranchiseHero.module.scss";

/* ========================================
   FRANCHISE HERO
======================================== */

export default function FranchiseHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="franchise-hero-title"
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className={styles.background} aria-hidden="true">
        <Image
          src="/images/franchise/hero/franquicias-1A.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 0px, 100vw"
          className={`${styles.image} ${styles.desktopImage}`}
        />

        <Image
          src="/images/franchise/hero/franquicias-1B.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className={`${styles.image} ${styles.mobileImage}`}
        />
      </div>

      {/* ========================================
          OVERLAY
      ======================================== */}

      <div className={styles.overlay} aria-hidden="true" />

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className={styles.container}>
        <div className={styles.content}>

          {/* EYEBROW */}

          <span className={styles.eyebrow}>
            FRANQUICIAS
          </span>

          {/* TITLE */}

          <h1
            id="franchise-hero-title"
            className={styles.title}
          >
            Una tradición
            <br />
            con futuro
          </h1>

          {/* DESCRIPTION */}

          <p className={styles.description}>
            Forma parte de una marca con cinco generaciones
            de experiencia, una receta artesanal y un modelo
            de negocio probado.
          </p>

          {/* ACTIONS */}

          <div className={styles.actions}>
            <Link
              href="/abre-tu-franquicia"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              QUIERO MÁS INFORMACIÓN

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

            <Link
              href="/nuestro-local"
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              CONOCE NUESTRA CHURRERÍA
            </Link>
          </div>

        </div>

        {/* ========================================
            DECORATIVE TEXT
        ======================================== */}

        <div className={styles.decorativeText} aria-hidden="true">
          <span>
            La misma receta
            <br />
            de siempre,
            <br />
            en más lugares.
          </span>

          <span className={styles.decorativeLine} />
        </div>

      </div>
    </section>
  );
}