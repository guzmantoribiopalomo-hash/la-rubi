import Image from "next/image";
import Link from "next/link";

import styles from "./HistoryRecipe.module.scss";

/* ========================================
   INGREDIENTS DATA
======================================== */

const ingredients = [
  {
    id: 1,
    name: "Harina de trigo",
    description: "Máxima pureza y textura única.",
    image: "/images/history/recipe/nuestra-historia-4-2.webp",
    alt: "Ilustración de harina de trigo",
  },
  {
    id: 2,
    name: "Aceite de girasol",
    description: "Calidad ideal para un resultado perfecto.",
    image: "/images/history/recipe/nuestra-historia-4-3.webp",
    alt: "Ilustración de aceite de girasol",
  },
  {
    id: 3,
    name: "Chocolate",
    description: "Cacao de alta calidad y sabor intenso.",
    image: "/images/history/recipe/nuestra-historia-4-4.webp",
    alt: "Ilustración de chocolate",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function HistoryRecipe() {
  return (
    <section
      className={styles.recipe}
      aria-labelledby="history-recipe-title"
    >
      <div className={styles.container}>

        {/* ========================================
            PROCESS IMAGE
        ======================================== */}

        <div className={styles.processImageWrapper}>
          <Image
            src="/images/history/recipe/nuestra-historia-4-1.webp"
            alt="Elaboración artesanal de churros con una churrera tradicional"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 35vw"
            className={styles.processImage}
          />
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className={styles.content}>

          <span className={styles.eyebrow}>
            NUESTRA RECETA
          </span>

          <h2
            id="history-recipe-title"
            className={styles.title}
          >
            El secreto está
            <br />
            en el buen hacer
          </h2>

          <p className={styles.description}>
            La masa, el aceite y el tiempo justo.
            Una receta precisa, transmitida y perfeccionada
            durante cinco generaciones, que da como resultado
            unos churros crujientes por fuera y tiernos por dentro.
          </p>

          <Link
            href="/productos"
            className={styles.button}
          >
            DESCUBRE NUESTROS PRODUCTOS
            <span aria-hidden="true">→</span>
          </Link>

        </div>

        {/* ========================================
            INGREDIENTS
        ======================================== */}

        <div className={styles.ingredients}>

          {ingredients.map((ingredient) => (
            <article
              key={ingredient.id}
              className={styles.ingredient}
            >

              <div className={styles.ingredientImageWrapper}>
                <Image
                  src={ingredient.image}
                  alt={ingredient.alt}
                  fill
                  sizes="(max-width: 767px) 25vw, 10vw"
                  className={styles.ingredientImage}
                />
              </div>

              <h3 className={styles.ingredientName}>
                {ingredient.name}
              </h3>

              <p className={styles.ingredientDescription}>
                {ingredient.description}
              </p>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}