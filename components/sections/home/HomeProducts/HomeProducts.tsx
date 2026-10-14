"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import styles from "./HomeProducts.module.scss";

/* ========================================
   PRODUCTS DATA
======================================== */

const products = [
  {
    id: 1,
    name: "Churros artesanos",
    description: "Crujientes por fuera y tiernos por dentro.",
    image: "/images/home/products/products-churros.webp",
  },
  {
    id: 2,
    name: "Chocolate",
    description: "Cacao de alta calidad con sabor intenso.",
    image: "/images/home/products/products-chocolate.webp",
  },
  {
    id: 3,
    name: "Cafés y bebidas",
    description: "La combinación perfecta para cualquier momento.",
    image: "/images/home/products/products-cafes.webp",
  },
  {
    id: 4,
    name: "Especialidades",
    description: "Más que churros, una experiencia completa.",
    image: "/images/home/products/products-especialidades.webp",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function HomeProducts() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [canNavigate, setCanNavigate] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

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

    const navigationEnabled =
      products.length > visibleSlides;

    setCanNavigate(navigationEnabled);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  /* ========================================
     AUTOPLAY CONTROL
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
     NAVIGATION
  ======================================== */

  const handlePrevious = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    swiper.autoplay?.stop();
    swiper.slidePrev();
  };

  const handleNext = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    swiper.autoplay?.stop();

    if (swiper.isEnd) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
  };

  return (
    <section
      className={styles.products}
      aria-labelledby="home-products-title"
    >
      <div className={styles.container}>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            NUESTROS PRODUCTOS
          </span>

          <h2
            id="home-products-title"
            className={styles.title}
          >
            El sabor de
            <br />
            siempre, cada día
          </h2>

          <p className={styles.description}>
            Churros artesanos, chocolate de alta calidad y mucho más.
            Productos elaborados con materias primas seleccionadas
            y el cuidado de una receta tradicional.
          </p>

          <Link
            href="/productos"
            className={styles.button}
          >
            DESCUBRE NUESTROS PRODUCTOS
          </Link>
        </div>

        {/* ========================================
            CAROUSEL
        ======================================== */}

        <div className={styles.carouselWrapper}>

          <Swiper
            modules={[Autoplay, A11y]}
            slidesPerView={1.3}
            spaceBetween={14}
            watchOverflow
            loop={false}
            speed={650}
            rewind
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateSwiperState(swiper);
            }}
            onSlideChange={updateSwiperState}
            onResize={updateSwiperState}
            onBreakpoint={updateSwiperState}
            onTouchStart={(swiper) => {
              swiper.autoplay?.stop();
            }}
            className={styles.swiper}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>

                <article className={styles.productCard}>

<div className={styles.imageWrapper}>
  <div className={styles.imageZoom}>
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes="(max-width: 639px) 75vw, (max-width: 1023px) 45vw, 20vw"
      className={styles.image}
    />
  </div>
</div>

                  <h3 className={styles.productName}>
                    {product.name}
                  </h3>

                  <p className={styles.productDescription}>
                    {product.description}
                  </p>

                </article>

              </SwiperSlide>
            ))}
          </Swiper>

          {/* ========================================
              NAVIGATION
          ======================================== */}

          {canNavigate && (
            <div className={styles.navigation}>

              <button
                type="button"
                className={styles.arrow}
                onClick={handlePrevious}
                disabled={isBeginning}
                aria-label="Ver productos anteriores"
              >
                ←
              </button>

              <button
                type="button"
                className={styles.arrow}
                onClick={handleNext}
                aria-label="Ver siguientes productos"
              >
                →
              </button>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}