import Image from "next/image";
import Link from "next/link";

import styles from "./LocalHero.module.scss";

/* ========================================
   LOCAL HERO
======================================== */

export default function LocalHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="local-hero-title"
    >
      {/* ========================================
          BACKGROUND IMAGES
      ======================================== */}

      <div
        className={styles.background}
        aria-hidden="true"
      >
        {/* DESKTOP IMAGE */}

        <Image
          src="/images/local/hero/nuestro-local-1A.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 0px, 100vw"
          className={`${styles.image} ${styles.desktopImage}`}
        />

        {/* MOBILE IMAGE */}

        <Image
          src="/images/local/hero/nuestro-local-1B.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className={`${styles.image} ${styles.mobileImage}`}
        />
      </div>

      {/* ========================================
          BACKGROUND OVERLAY
      ======================================== */}

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className={styles.container}>
        <div className={styles.content}>

          {/* EYEBROW */}

          <span className={styles.eyebrow}>
            NUESTRA CHURRERÍA
          </span>

          {/* TITLE */}

          <h1
            id="local-hero-title"
            className={styles.title}
          >
            Un lugar con
            <br />
            historia, sabor
            <br />
            y tradición
          </h1>

          {/* DESCRIPTION */}

          <p className={styles.description}>
            Te esperamos en nuestro establecimiento para que
            vivas la auténtica experiencia La Rubí. Un espacio
            pensado para disfrutar de la tradición en un
            ambiente acogedor.
          </p>

          {/* ========================================
              ACTION BUTTONS
          ======================================== */}

          <div className={styles.actions}>

            <Link
              href="#ubicacion"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              VEN A VISITARNOS
            </Link>

            <Link
              href="/abre-tu-franquicia"
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              ABRE TU FRANQUICIA
            </Link>

          </div>
        </div>

        {/* ========================================
            DECORATIVE TEXT
        ======================================== */}

        <div
          className={styles.decorativeText}
          aria-hidden="true"
        >
          <span>
            Más que churros,
            <br />
            una tradición.
          </span>

          <span className={styles.decorativeLine} />
        </div>

      </div>
    </section>
  );
}