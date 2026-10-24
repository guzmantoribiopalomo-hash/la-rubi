"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./LocalExperience.module.scss";

/* ========================================
   GALLERY DATA
======================================== */

const gallery = [
  {
    id: 1,
    src: "/images/local/experience/nuestro-local-3-1.webp",
    alt: "Interior de Churrería La Rubí con su mostrador de productos artesanos",
  },
  {
    id: 2,
    src: "/images/local/experience/nuestro-local-3-2.webp",
    alt: "Fachada y entrada principal de Churrería La Rubí",
  },
  {
    id: 3,
    src: "/images/local/experience/nuestro-local-3-3.webp",
    alt: "Chocolate caliente servido en una taza de Churrería La Rubí",
  },
  {
    id: 4,
    src: "/images/local/experience/nuestro-local-3-4.webp",
    alt: "Zona de mesas del establecimiento La Rubí",
  },
  {
    id: 5,
    src: "/images/local/experience/nuestro-local-3-5.webp",
    alt: "Detalles de la decoración interior de Churrería La Rubí",
  },
];

/* ========================================
   LOCAL EXPERIENCE
======================================== */

export default function LocalExperience() {
  return (
    <section
      className={styles.experience}
      aria-labelledby="local-experience-title"
    >
      <div className={styles.container}>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>

          <span className={styles.eyebrow}>
            LA EXPERIENCIA
          </span>

          <h2
            id="local-experience-title"
            className={styles.title}
          >
            La experiencia
            <br />
            La Rubí
          </h2>

          <p className={styles.description}>
            Un espacio que combina tradición y modernidad,
            creado para que disfrutes de nuestros churros
            y chocolate en un ambiente cómodo y familiar.
          </p>

          {/* DESKTOP BUTTON */}

          <Link
            href="/nuestro-local/galeria"
            className={`${styles.button} ${styles.desktopButton}`}
          >
            VER GALERÍA DE FOTOS
          </Link>

        </div>

        {/* ========================================
            DESKTOP GALLERY
        ======================================== */}

        <div className={styles.desktopGallery}>

          {gallery.map((image, index) => (
            <div
              key={image.id}
              className={`${styles.galleryItem} ${
                index === 0 ? styles.featuredImage : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 1023px) 50vw, 30vw"
                    : "(max-width: 1023px) 25vw, 15vw"
                }
                className={styles.image}
              />
            </div>
          ))}

        </div>

        {/* ========================================
            MOBILE GALLERY
        ======================================== */}

        <div className={styles.mobileGallery}>

          <Swiper
            modules={[A11y, Pagination]}
            slidesPerView={1.15}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            className={styles.swiper}
          >
            {gallery.map((image) => (
              <SwiperSlide key={image.id}>

                <div className={styles.mobileImageWrapper}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="90vw"
                    className={styles.image}
                  />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>

          {/* MOBILE BUTTON */}

          <Link
            href="/nuestro-local/galeria"
            className={`${styles.button} ${styles.mobileButton}`}
          >
            VER GALERÍA DE FOTOS
          </Link>

        </div>

      </div>
    </section>
  );
}