import Image from "next/image";

import styles from "./ProductsHero.module.scss";

/* ========================================
   PRODUCTS HERO
======================================== */

export default function ProductsHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="products-hero-title"
    >
      {/* ========================================
          BACKGROUND IMAGES
      ======================================== */}

      <div className={styles.background}>
        {/* DESKTOP */}

        <Image
          src="/images/products/hero/productos-1A.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 1px, 100vw"
          className={`${styles.image} ${styles.desktopImage}`}
        />

        {/* MOBILE */}

        <Image
          src="/images/products/hero/productos-1B.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          className={`${styles.image} ${styles.mobileImage}`}
        />
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className={styles.container}>
        <div className={styles.content}>
          {/* EYEBROW */}

          <span className={styles.eyebrow}>
            NUESTROS PRODUCTOS
          </span>

          {/* TITLE */}

          <h1
            id="products-hero-title"
            className={styles.title}
          >
            El sabor
            <br />
            de siempre,
            <br />
            cada día
          </h1>

          {/* DESCRIPTION */}

          <p className={styles.description}>
            Churros artesanos, chocolate y mucho más.
            Elaborados cada día con materias primas
            de máxima calidad.
          </p>
        </div>

        {/* ========================================
            DECORATIVE TEXT
        ======================================== */}

        <div
          className={styles.decorativeText}
          aria-hidden="true"
        >
          <span>
            Crujientes
            <br />
            por fuera,
            <br />
            tiernos por dentro.
          </span>

          <span className={styles.decorativeLine} />
        </div>
      </div>
    </section>
  );
}