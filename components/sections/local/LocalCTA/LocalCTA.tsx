import Image from "next/image";
import Link from "next/link";

import styles from "./LocalCTA.module.scss";

export default function LocalCTA() {
  return (
    <section
      className={styles.cta}
      aria-labelledby="local-cta-title"
    >
      {/* CHURROS DECORATIVOS */}

      <div className={styles.imageWrapper} aria-hidden="true">
        <Image
          src="/images/local/cta/nuestro-local-5.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 180px, 450px"
          className={styles.image}
        />
      </div>

      {/* CONTENIDO */}

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            NUESTRA CHURRERÍA, EL ORIGEN DE UN PROYECTO MAYOR
          </span>

          <h2 id="local-cta-title" className={styles.title}>
            La misma pasión, en más lugares.
          </h2>

          <p className={styles.description}>
            Este es el punto de partida de un proyecto con el que
            queremos llevar el sabor de La Rubí a nuevas ciudades.
            Forma parte de nuestra historia.
          </p>

          <Link
            href="/abre-tu-franquicia"
            className={styles.button}
          >
            QUIERO ABRIR UNA FRANQUICIA

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
      </div>

      {/* DECORACIÓN DERECHA */}

<div className={styles.decoration} aria-hidden="true">
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <path
        id="rubí-curve"
        d="M 20 150 C 90 150, 145 95, 145 25"
      />
    </defs>

    {/* Curva izquierda */}
    <use
      href="#rubí-curve"
      transform="translate(-20 -20)"
      stroke="currentColor"
      strokeWidth="9"
    />

    {/* Curva central */}
    <use
      href="#rubí-curve"
      stroke="currentColor"
      strokeWidth="9"
    />

    {/* Curva derecha */}
    <use
      href="#rubí-curve"
      transform="translate(20 20)"
      stroke="currentColor"
      strokeWidth="9"
    />
  </svg>
</div>
    </section>
  );
}