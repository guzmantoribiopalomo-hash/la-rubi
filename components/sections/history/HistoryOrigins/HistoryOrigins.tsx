import Image from "next/image";

import styles from "./HistoryOrigins.module.scss";

export default function HistoryOrigins() {
  return (
    <section
      id="nuestros-origenes"
      className={styles.origins}
      aria-labelledby="history-origins-title"
    >
      <div className={styles.container}>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>

          <span className={styles.eyebrow}>
            NUESTROS ORÍGENES
          </span>

          <h2
            id="history-origins-title"
            className={styles.title}
          >
            Todo comenzó
            <br />
            en 1930
          </h2>

          <p className={styles.description}>
            Nuestra historia nace en La Mancha, con una
            receta familiar y una forma única de elaborar
            churros artesanos.

            Lo que empezó como un pequeño obrador se
            convirtió en una tradición que, generación
            tras generación, ha mantenido vivo el
            auténtico sabor de siempre.
          </p>

        </div>

        {/* ========================================
            HISTORICAL IMAGE
        ======================================== */}

        <div className={styles.imageWrapper}>
          <Image
            src="/images/history/origins/nuestra-historia-2-1.webp"
            alt="Fotografía histórica de los orígenes de una churrería familiar"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
            className={styles.image}
          />
        </div>

        {/* ========================================
            CORPORATE MASCOT
        ======================================== */}

        <div className={styles.mascotWrapper}>

          <span className={styles.mascotText}>
            La misma
            <br />
            pasión de
            <br />
            siempre.
          </span>

          <div className={styles.mascotImage}>
            <Image
              src="/images/history/origins/nuestra-historia-2-2.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 130px, 200px"
              className={styles.mascot}
            />
          </div>

        </div>

      </div>
    </section>
  );
}