import Image from "next/image";
import Link from "next/link";

import styles from "./HomeFranchises.module.scss";

const advantages = [
  {
    id: 1,
    icon: "🏪",
    title: "Marca consolidada",
    description: "y con historia",
  },
  {
    id: 2,
    icon: "🎓",
    title: "Formación",
    description: "personalizada",
  },
  {
    id: 3,
    icon: "📈",
    title: "Modelo de negocio",
    description: "probado",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Acompañamiento",
    description: "continuo",
  },
];

export default function HomeFranchises() {
  return (
    <section
      className={styles.franchises}
      aria-labelledby="home-franchises-title"
    >
      <div className={styles.background}>
        <Image
          src="/images/home/franchises/franchises-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            FRANQUICIAS
          </span>

          <h2
            id="home-franchises-title"
            className={styles.title}
          >
            Forma parte de
            <br />
            nuestra historia
          </h2>

          <p className={styles.description}>
            Un negocio con sabor a tradición,
            listo para crecer contigo.
          </p>

          <Link
            href="/franquicias"
            className={styles.button}
          >
            DESCUBRE NUESTRAS FRANQUICIAS
          </Link>
        </div>

        <div className={styles.advantages}>
          {advantages.map((advantage) => (
            <div
              key={advantage.id}
              className={styles.advantage}
            >
              <span
                className={styles.icon}
                aria-hidden="true"
              >
                {advantage.icon}
              </span>

              <h3 className={styles.advantageTitle}>
                {advantage.title}
              </h3>

              <p className={styles.advantageDescription}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}