import Image from "next/image";

import styles from "./HistoryGenerations.module.scss";

/* ========================================
   GENERATIONS DATA
======================================== */

const generations = [
  {
    id: 1,
    period: "1930",
    title: "Los orígenes",
    image: "/images/history/generations/nuestra-historia-3-1.webp",
    alt: "Primera generación de una churrería familiar en 1930",
  },
  {
    id: 2,
    period: "2ª GENERACIÓN",
    title: "El legado continúa",
    image: "/images/history/generations/nuestra-historia-3-2.webp",
    alt: "Segunda generación de churreros continuando la tradición familiar",
  },
  {
    id: 3,
    period: "3ª GENERACIÓN",
    title: "La tradición se consolida",
    image: "/images/history/generations/nuestra-historia-3-3.webp",
    alt: "Tercera generación elaborando churros artesanalmente",
  },
  {
    id: 4,
    period: "4ª GENERACIÓN",
    title: "Innovación y crecimiento",
    image: "/images/history/generations/nuestra-historia-3-4.webp",
    alt: "Evolución de una churrería tradicional hacia un establecimiento moderno",
  },
  {
    id: 5,
    period: "5ª GENERACIÓN",
    title: "Un futuro compartido",
    image: "/images/history/generations/nuestra-historia-3-5.webp",
    alt: "Interior contemporáneo de una churrería",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function HistoryGenerations() {
  return (
    <section
      className={styles.generations}
      aria-labelledby="history-generations-title"
    >
      <div className={styles.container}>

        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className={styles.header}>

          <span className={styles.eyebrow}>
            CINCO GENERACIONES
          </span>

          <h2
            id="history-generations-title"
            className={styles.title}
          >
            Una herencia que sigue viva
          </h2>

          <p className={styles.description}>
            Cada generación ha aportado su esfuerzo,
            conocimiento e innovación, manteniendo intacta
            la esencia de nuestra receta familiar.
          </p>

        </div>

        {/* ========================================
            TIMELINE
        ======================================== */}

        <ol className={styles.timeline}>

          {generations.map((generation) => (
            <li
              key={generation.id}
              className={styles.timelineItem}
            >

              {/* TIMELINE MARKER */}

              <div
                className={styles.timelineMarker}
                aria-hidden="true"
              />

              {/* GENERATION CONTENT */}

              <div className={styles.generationContent}>

                <h3 className={styles.generationPeriod}>
                  {generation.period}
                </h3>

                <p className={styles.generationTitle}>
                  {generation.title}
                </p>

                {/* GENERATION IMAGE */}

                <div className={styles.imageWrapper}>

                  <Image
                    src={generation.image}
                    alt={generation.alt}
                    fill
                    sizes="(max-width: 767px) 40vw, (max-width: 1023px) 30vw, 18vw"
                    className={styles.image}
                  />

                </div>

              </div>

            </li>
          ))}

        </ol>

      </div>
    </section>
  );
}