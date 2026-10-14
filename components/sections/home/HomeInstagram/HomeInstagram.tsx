"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import styles from "./HomeInstagram.module.scss";

/* ========================================
   INSTAGRAM DATA
======================================== */

const instagramImages = [
  {
    id: 1,
    image: "/images/home/instagram/instagram-01.webp",
    alt: "Elaboración artesanal de churros La Rubí",
  },
  {
    id: 2,
    image: "/images/home/instagram/instagram-02.webp",
    alt: "Chocolate caliente de Churrería La Rubí",
  },
  {
    id: 3,
    image: "/images/home/instagram/instagram-03.webp",
    alt: "Especialidades artesanales de La Rubí",
  },
  {
    id: 4,
    image: "/images/home/instagram/instagram-04.webp",
    alt: "Fachada de Churrería La Rubí",
  },
  {
    id: 5,
    image: "/images/home/instagram/instagram-05.webp",
    alt: "Interior de Churrería La Rubí",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function HomeInstagram() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [reducedMotion, setReducedMotion] = useState(true);
  const [canNavigate, setCanNavigate] = useState(false);

  /* ========================================
     REDUCED MOTION
  ======================================== */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  /* ========================================
     SWIPER STATE
  ======================================== */

  const updateSwiperState = (swiper: SwiperType) => {
    if (swiper.destroyed) return;

    const visibleSlides = Number(swiper.params.slidesPerView);

    setCanNavigate(
      instagramImages.length > visibleSlides
    );
  };

  /* ========================================
     AUTOPLAY
  ======================================== */

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed || !swiper.autoplay) {
      return;
    }

    if (canNavigate && !reducedMotion) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [canNavigate, reducedMotion]);

  /* ========================================
     RENDER
  ======================================== */

  return (
    <section
      className={styles.instagram}
      aria-labelledby="home-instagram-title"
    >
      <div className={styles.container}>

        {/* CONTENT */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            SÍGUENOS EN INSTAGRAM
          </span>

          <h2
            id="home-instagram-title"
            className={styles.title}
          >
            Momentos que saben
            <br />
            a tradición
          </h2>
        </div>

        {/* CAROUSEL */}

        <div className={styles.carouselWrapper}>
          <Swiper
            modules={[Autoplay, A11y]}
            slidesPerView={1.5}
            spaceBetween={10}
            watchOverflow
            rewind
            speed={650}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2.2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateSwiperState(swiper);
            }}
            onResize={updateSwiperState}
            onBreakpoint={updateSwiperState}
            className={styles.swiper}
          >
            {instagramImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageZoom}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 479px) 60vw, (max-width: 767px) 45vw, (max-width: 1023px) 25vw, 12vw"
                      className={styles.image}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* BUTTON */}

        <div className={styles.action}>
          <Link
            href="/"
            className={styles.button}
            aria-label="Ver Instagram de Churrería La Rubí"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
              />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>

            VER EN INSTAGRAM
          </Link>
        </div>

      </div>
    </section>
  );
}