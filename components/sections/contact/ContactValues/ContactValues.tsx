import Image from "next/image";

import {
  Heart,
  Coffee,
  UsersRound,
  MessageCircleHeart,
} from "lucide-react";

import styles from "./ContactValues.module.scss";

const values = [
  {
    id: "tradition",
    title: "TRADICIÓN FAMILIAR",
    description: "Cinco generaciones compartiendo nuestra pasión.",
    icon: Heart,
  },
  {
    id: "artisan",
    title: "ELABORACIÓN ARTESANAL",
    description: "Churros recién hechos con nuestra receta de siempre.",
    icon: Coffee,
  },
  {
    id: "closeness",
    title: "TRATO CERCANO",
    description: "Nos gusta escuchar y cuidar a quienes nos visitan.",
    icon: UsersRound,
  },
  {
    id: "contact",
    title: "ESTAMOS PARA TI",
    description: "Tus preguntas y sugerencias nos ayudan a mejorar.",
    icon: MessageCircleHeart,
  },
];

export default function ContactValues() {
  return (
    <section
      className={styles.values}
      aria-label="Nuestros valores"
    >
      {/* BACKGROUND */}

      <div
        className={styles.background}
        aria-hidden="true"
      >
        <Image
          src="/images/contact/values/contacto-3A.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 0px, 100vw"
          className={`${styles.backgroundImage} ${styles.desktopImage}`}
        />

        <Image
          src="/images/contact/values/contacto-3B.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 0px"
          className={`${styles.backgroundImage} ${styles.mobileImage}`}
        />
      </div>

      {/* OVERLAY */}

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* CONTENT */}

      <div className={styles.container}>
        <div className={styles.grid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.id}
                className={styles.item}
              >
                <div
                  className={styles.iconWrapper}
                  aria-hidden="true"
                >
                  <Icon
                    size={34}
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className={styles.title}>
                  {value.title}
                </h3>

                <p className={styles.description}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}