import {
  Sunrise,
  UsersRound,
  CookingPot,
  Heart,
  type LucideIcon,
} from "lucide-react";

import styles from "./HomeValues.module.scss";

interface Value {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  {
    id: 1,
    title: "Tradición desde 1930",
    description:
      "Una historia familiar que sigue viva en cada churro que elaboramos.",
    icon: Sunrise,
  },
  {
    id: 2,
    title: "5 generaciones de experiencia",
    description:
      "Conocimiento transmitido de generación en generación.",
    icon: UsersRound,
  },
  {
    id: 3,
    title: "Elaboración artesanal",
    description:
      "Churros crujientes por fuera y tiernos por dentro.",
    icon: CookingPot,
  },
  {
    id: 4,
    title: "Una oportunidad de negocio real",
    description:
      "Un modelo probado, con acompañamiento y formación.",
    icon: Heart,
  },
];

export default function HomeValues() {
  return (
    <section
      className={styles.values}
      aria-label="Los valores de Churrería La Rubí"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.id}
                className={styles.item}
              >
                <div className={styles.iconWrapper}>
                  <Icon
                    size={42}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <h2 className={styles.title}>
                  {value.title}
                </h2>

                <p className={styles.description}>
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}