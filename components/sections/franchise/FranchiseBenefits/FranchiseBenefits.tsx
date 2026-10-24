import {
  Award,
  Store,
  GraduationCap,
  ChartNoAxesCombined,
  MapPin,
} from "lucide-react";

import styles from "./FranchiseBenefits.module.scss";

/* ========================================
   BENEFITS DATA
======================================== */

const benefits = [
  {
    id: "recipe",
    title: "RECETA ARTESANAL PROPIA",
    description: "Cinco generaciones de tradición.",
    icon: Award,
  },
  {
    id: "business",
    title: "MODELO DE NEGOCIO PROBADO",
    description: "Basado en un establecimiento real en funcionamiento.",
    icon: Store,
  },
  {
    id: "training",
    title: "FORMACIÓN Y ACOMPAÑAMIENTO",
    description: "Te ayudamos en cada paso.",
    icon: GraduationCap,
  },
  {
    id: "brand",
    title: "MARCA CONSOLIDADA",
    description: "Una identidad fuerte y reconocible.",
    icon: ChartNoAxesCombined,
  },
  {
    id: "expansion",
    title: "EXPANSIÓN CON SENTIDO",
    description: "Llevamos el sabor de La Rubí a nuevas ciudades.",
    icon: MapPin,
  },
];

/* ========================================
   FRANCHISE BENEFITS
======================================== */

export default function FranchiseBenefits() {
  return (
    <section
      className={styles.benefits}
      aria-label="Ventajas de abrir una franquicia La Rubí"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.id}
                className={styles.item}
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
                  {benefit.title}
                </h2>

                {/* DESCRIPTION */}

                <p className={styles.description}>
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}