import Image from "next/image";
import Link from "next/link";

import styles from "./HistoryFuture.module.scss";

/* ========================================
   COMPONENT
======================================== */

export default function HistoryFuture() {
  return (
    <section
      className={styles.future}
      aria-labelledby="history-future-title"
    >
      {/* ========================================
          DECORATIVE LINES
      ======================================== */}

      <div
        className={styles.decoration}
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

          <span className={styles.eyebrow}>
            EL FUTURO
          </span>

          <h2
            id="history-future-title"
            className={styles.title}
          >
            Una historia que continúa...
          </h2>

          <p className={styles.description}>
            Hoy, queremos seguir compartiendo nuestra tradición
            a través de nuevas churrerías en más lugares.
            Forma parte de nuestra historia y empecemos
            juntos el próximo capítulo.
          </p>

        </div>

        {/* ========================================
            CTA
        ======================================== */}

        <div className={styles.ctaWrapper}>
          <Link
            href="/franquicias"
            className={styles.button}
          >
            ABRE TU FRANQUICIA

            <span aria-hidden="true">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* ========================================
          PRODUCT IMAGE
      ======================================== */}

      <div className={styles.imageWrapper}>
        <Image
          src="/images/history/future/nuestra-historia-5.webp"
          alt="Churros artesanos acompañados de chocolate caliente"
          fill
          sizes="(max-width: 767px) 100vw, 35vw"
          className={styles.image}
        />
      </div>

    </section>
  );
}