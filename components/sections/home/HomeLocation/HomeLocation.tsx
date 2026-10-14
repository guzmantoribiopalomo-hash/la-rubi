import Image from "next/image";
import Link from "next/link";

import styles from "./HomeLocation.module.scss";

const locationImages = {
  interior: "/images/home/location/location-interior.webp",
  exterior: "/images/home/location/location-exterior.webp",
  detail: "/images/home/location/location-detail.webp",
};

export default function HomeLocation() {
  return (
    <section
      className={styles.location}
      aria-labelledby="home-location-title"
    >
      <div className={styles.container}>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            NUESTRA CHURRERÍA
          </span>

          <h2
            id="home-location-title"
            className={styles.title}
          >
            Ven a conocernos
          </h2>

          <p className={styles.description}>
            Te esperamos en nuestro establecimiento para que
            vivas la auténtica experiencia La Rubí.
            Un espacio pensado para disfrutar de la tradición
            en un ambiente acogedor.
          </p>

          <Link
            href="/nuestra-churreria"
            className={styles.button}
          >
            VER CÓMO LLEGAR
          </Link>
        </div>

        {/* ========================================
            IMAGE GALLERY
        ======================================== */}

        <div className={styles.gallery}>

          {/* MAIN IMAGE */}

          <div className={styles.mainImage}>
            <Image
              src={locationImages.interior}
              alt="Interior de la churrería La Rubí"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 70vw, 45vw"
              className={styles.image}
            />
          </div>

          {/* SECONDARY IMAGES */}

          <div className={styles.secondaryImages}>

            <div className={styles.secondaryImage}>
              <Image
                src={locationImages.exterior}
                alt="Fachada de la churrería La Rubí"
                fill
                sizes="(max-width: 767px) 50vw, 20vw"
                className={styles.image}
              />
            </div>

            <div className={styles.secondaryImage}>
              <Image
                src={locationImages.detail}
                alt="Detalle del establecimiento La Rubí"
                fill
                sizes="(max-width: 767px) 50vw, 20vw"
                className={styles.image}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}