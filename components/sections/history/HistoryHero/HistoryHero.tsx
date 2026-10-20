import Image from "next/image";
import Link from "next/link";

import styles from "./HistoryHero.module.scss";

export default function HistoryHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="history-hero-title"
    >
      {/* BACKGROUND IMAGE */}

      <div className={styles.imageWrapper}>
        <Image
          src="/images/history/hero/nuestra-historia-1.webp"
          alt="Elaboración artesanal de churros en una churrería tradicional"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      {/* DARK OVERLAY */}

      <div className={styles.overlay} />

      {/* CONTENT */}

      <div className={styles.container}>
        <div className={styles.content}>

          <span className={styles.eyebrow}>
            DESDE 1930
          </span>

          <h1
            id="history-hero-title"
            className={styles.title}
          >
            Nuestra
            <br />
            historia
          </h1>

          <p className={styles.description}>
            Una tradición familiar que comenzó en 1930
            y que hoy sigue viva en cada churro que
            elaboramos. Cinco generaciones unidas por
            una misma pasión: el buen hacer.
          </p>

          <Link
            href="#nuestros-origenes"
            className={styles.button}
          >
            DESCUBRE NUESTRA HISTORIA

            <span aria-hidden="true">
              ↓
            </span>
          </Link>

        </div>

        {/* DECORATIVE TEXT */}

        <div
          className={styles.decorativeText}
          aria-hidden="true"
        >
          <span>
            Tradición y sabor
          </span>

          <span>
            que trascienden
          </span>

          <span>
            generaciones.
          </span>

          <div className={styles.decorativeLine} />
        </div>

      </div>
    </section>
  );
}