import Image from "next/image";
import Link from "next/link";

import styles from "./HomeHistory.module.scss";

export default function HomeHistory() {
  return (
    <section
      className={styles.history}
      aria-labelledby="home-history-title"
    >
      <div className={styles.container}>

        {/* FOTOGRAFÍA HISTÓRICA */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/home/history/history.webp"
            alt="Recreación de una churrería tradicional elaborando churros artesanalmente"
            fill
            sizes="(max-width: 767px) 45vw, 40vw"
            className={styles.image}
          />
        </div>

        {/* CONTENIDO */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            NUESTRA HISTORIA
          </span>

          <h2
            id="home-history-title"
            className={styles.title}
          >
            Una tradición
            <br />
            que trasciende
            <br />
            generaciones
          </h2>

          <p className={styles.description}>
            Desde hace cinco generaciones, una misma pasión:
            elaborar churros artesanos con una receta familiar
            única de La Mancha, transmitida y perfeccionada
            a lo largo del tiempo.
          </p>

          <Link
            href="/nuestra-historia"
            className={styles.button}
          >
            CONOCE NUESTRA HISTORIA
          </Link>
        </div>

        {/* ILUSTRACIÓN CORPORATIVA */}
        <div className={styles.pet01Wrapper}>
          <Image
            src="/images/home/history/pet01.webp"
            alt=""
            fill
            sizes="25vw"
            className={styles.pet01}
          />
        </div>

      </div>
    </section>
  );
}