import Link from "next/link";
import styles from "./HomeHero.module.scss";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      {/* IMAGEN DE FONDO */}
      <picture className={styles.background}>
        <source
          media="(max-width: 767px)"
          srcSet="/images/home/hero/hero-mobile.webp"
        />

        <img
          src="/images/home/hero/hero-desktop.webp"
          alt=""
          className={styles.backgroundImage}
          fetchPriority="high"
        />
      </picture>

      {/* CAPA PARA MEJORAR LA LEGIBILIDAD */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* CONTENIDO */}
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            DESDE 1930
          </span>

          <h1 className={styles.title}>
            Cinco
            <br />
            <strong>generaciones</strong>
            <br />
            de tradición
          </h1>

          <p className={styles.description}>
            Churros artesanos elaborados con la misma receta
            familiar, donde la calidad y el sabor siguen
            siendo los protagonistas.
          </p>

          <div className={styles.actions}>
            <Link
              href="/nuestra-historia"
              className={styles.primaryButton}
            >
              DESCUBRE NUESTRA HISTORIA
            </Link>

            <Link
              href="/abre-tu-franquicia"
              className={styles.secondaryButton}
            >
              ABRE TU FRANQUICIA
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}