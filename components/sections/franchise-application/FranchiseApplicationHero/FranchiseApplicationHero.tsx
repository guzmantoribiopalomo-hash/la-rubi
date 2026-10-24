import Image from "next/image";
import Link from "next/link";
import styles from "./FranchiseApplicationHero.module.scss";

export default function FranchiseApplicationHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="franchise-application-title"
    >
      <div className={styles.background}>
        <Image
          src="/images/franchise-application/hero/abre-tu-franquicia-1A.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 0px, 100vw"
          className={styles.desktopImage}
        />

        <Image
          src="/images/franchise-application/hero/abre-tu-franquicia-1B.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className={styles.mobileImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Nuevas franquicias
          </span>

          <h1
            id="franchise-application-title"
            className={styles.title}
          >
            Tradición
            <br />
            que genera
            <br />
            oportunidades
          </h1>

          <p className={styles.description}>
            Únete a Churrería La Rubí y forma parte de un proyecto
            con historia, sabor y un modelo de negocio probado.
          </p>

          <Link
            href="#solicitud-franquicia"
            className={styles.cta}
          >
            Quiero más información

            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}