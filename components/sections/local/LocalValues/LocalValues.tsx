import Image from "next/image";

import {
  Coffee,
  UsersRound,
  Heart,
} from "lucide-react";

import styles from "./LocalValues.module.scss";

/* ========================================
   VALUES DATA
======================================== */

const values = [
  {
    id: "fresh",
    icon: Coffee,
    title: "CHURROS RECIÉN HECHOS",
    description:
      "Elaboración artesana diaria en nuestro obrador.",
  },
  {
    id: "atmosphere",
    icon: UsersRound,
    title: "UN AMBIENTE ACOGEDOR",
    description:
      "Un espacio para disfrutar en cualquier momento.",
  },
  {
    id: "tradition",
    icon: Heart,
    title: "TRADICIÓN FAMILIAR",
    description:
      "Cinco generaciones compartiendo la misma receta.",
  },
];

/* ========================================
   LOCAL VALUES
======================================== */

export default function LocalValues() {
  return (
    <section
      className={styles.values}
      aria-label="Nuestros valores"
    >
      <div className={styles.container}>

        {/* ========================================
            VALUES LIST
        ======================================== */}

        <div className={styles.valuesList}>

          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.id}
                className={styles.value}
              >

                {/* ICON */}

                <div
                  className={styles.iconWrapper}
                  aria-hidden="true"
                >
                  <Icon
                    className={styles.icon}
                    strokeWidth={1.7}
                  />
                </div>

                {/* TITLE */}

                <h2 className={styles.title}>
                  {value.title}
                </h2>

                {/* DESCRIPTION */}

                <p className={styles.description}>
                  {value.description}
                </p>

              </article>
            );
          })}

        </div>

        {/* ========================================
            CORPORATE MASCOT
        ======================================== */}

        <div className={styles.mascot}>

          <div className={styles.mascotImage}>
            <Image
              src="/images/home/history/pet01.webp"
              alt="Mascota de Churrería La Rubí"
              fill
              sizes="(max-width: 767px) 90px, 140px"
              className={styles.image}
            />
          </div>

          {/* DECORATIVE TEXT */}

          <div
            className={styles.decorativeText}
            aria-hidden="true"
          >
            <span>
              Aquí
              <br />
              empieza
              <br />
              todo.
            </span>

            <span className={styles.decorativeLine} />
          </div>

        </div>

      </div>
    </section>
  );
}