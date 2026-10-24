import Link from "next/link";

import {
  MessageSquareMore,
  FileText,
  Handshake,
  ChefHat,
  Store,
  ArrowRight,
} from "lucide-react";

import styles from "./FranchiseProcess.module.scss";

const processSteps = [
  {
    id: "contact",
    number: "01",
    title: "Contacto",
    description: "Solicita información y cuéntanos tu proyecto.",
    icon: MessageSquareMore,
  },
  {
    id: "feasibility",
    number: "02",
    title: "Estudio de viabilidad",
    description: "Analizamos la ubicación y el potencial del local.",
    icon: FileText,
  },
  {
    id: "planning",
    number: "03",
    title: "Firma y planificación",
    description: "Definimos el plan de apertura y el calendario.",
    icon: Handshake,
  },
  {
    id: "training",
    number: "04",
    title: "Formación",
    description: "Te formamos en nuestra receta y operativa.",
    icon: ChefHat,
  },
  {
    id: "opening",
    number: "05",
    title: "Apertura",
    description: "Te acompañamos en la puesta en marcha.",
    icon: Store,
  },
];

export default function FranchiseProcess() {
  return (
    <section
      className={styles.process}
      aria-labelledby="franchise-process-title"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            ¿CÓMO FUNCIONA?
          </span>

          <h2
            id="franchise-process-title"
            className={styles.title}
          >
            Te acompañamos
            <br />
            en todo el proceso
          </h2>

          <p className={styles.description}>
            Nuestro equipo te guía paso a paso para que
            puedas abrir tu propia churrería La Rubí de
            forma segura y con el respaldo de nuestra
            experiencia.
          </p>

          <Link
            href="/abre-tu-franquicia"
            className={styles.button}
          >
            QUIERO MÁS INFORMACIÓN

            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>

        <ol className={styles.timeline}>
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <li key={step.id} className={styles.step}>
                <div
                  className={styles.iconWrapper}
                  aria-hidden="true"
                >
                  <Icon
                    className={styles.icon}
                    strokeWidth={1.8}
                  />
                </div>

                <div className={styles.stepContent}>
                  <span
                    className={styles.stepNumber}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  <h3 className={styles.stepTitle}>
                    {step.title}
                  </h3>

                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}