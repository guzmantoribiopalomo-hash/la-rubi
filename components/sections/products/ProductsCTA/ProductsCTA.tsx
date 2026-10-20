import Image from "next/image";
import Link from "next/link";

import styles from "./ProductsCTA.module.scss";

/* ========================================
   PRODUCTS CTA
======================================== */

export default function ProductsCTA() {
  return (
    <section
      className={styles.cta}
      aria-labelledby="products-cta-title"
    >

      {/* ========================================
          BACKGROUND IMAGE
      ======================================== */}

      <div
        className={styles.background}
        aria-hidden="true"
      >
        <picture>

          {/* MOBILE IMAGE */}

          <source
            media="(max-width: 767px)"
            srcSet="/images/products/cta/productos-4A.webp"
          />

          {/* DESKTOP IMAGE */}

          <img
            src="/images/products/cta/productos-4B.webp"
            alt=""
            className={styles.backgroundImage}
          />

        </picture>
      </div>

      {/* ========================================
          BACKGROUND OVERLAY
      ======================================== */}

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* ========================================
          DECORATIVE ELEMENTS
      ======================================== */}

      <div
        className={styles.decorationLeft}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>

      <div
        className={styles.decorationRight}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className={styles.container}>

        <div className={styles.content}>

          {/* EYEBROW */}

          <span className={styles.eyebrow}>
            UN PLACER PARA COMPARTIR
          </span>

          {/* TITLE */}

          <h2
            id="products-cta-title"
            className={styles.title}
          >
            Tradición que se disfruta
            <br />
            en cualquier momento
          </h2>

          {/* DESCRIPTION */}

          <p className={styles.description}>
            Desayuna, merienda o disfruta de un capricho
            a cualquier hora del día. Nuestros productos
            están pensados para hacer de cada momento
            una experiencia especial.
          </p>

        </div>

        {/* ========================================
            CTA BUTTON
        ======================================== */}

        <div className={styles.action}>

          <Link
            href="/nuestro-local"
            className={styles.button}
          >
            DESCUBRE NUESTRA CHURRERÍA

            <span aria-hidden="true">
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}