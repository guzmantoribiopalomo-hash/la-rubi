import Image from "next/image";

import styles from "./ProductsTradition.module.scss";

/* ========================================
   INGREDIENTS DATA
======================================== */

const ingredients = [
  {
    id: 1,
    name: "Harina de trigo",
    description:
      "Harina de máxima pureza, base de una textura única, ligera, crujiente y homogénea.",
    image: "/images/products/tradition/productos-3-1.webp",
  },
  {
    id: 2,
    name: "Aceite de girasol",
    description:
      "Aceite alto oleico, ideal para fritura profesional. Mayor durabilidad y un resultado más saludable.",
    image: "/images/products/tradition/productos-3-2.webp",
  },
  {
    id: 3,
    name: "Chocolate",
    description:
      "Cacao de alta calidad, con textura densa y un sabor intenso.",
    image: "/images/products/tradition/productos-3-3.webp",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function ProductsTradition() {
  return (
    <section
      className={styles.tradition}
      aria-labelledby="products-tradition-title"
    >
      <div className={styles.container}>

        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className={styles.header}>

          {/* HEADING */}

          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              MATERIA PRIMA
            </span>

            <h2
              id="products-tradition-title"
              className={styles.title}
            >
              La calidad está en el origen
            </h2>

            <p className={styles.description}>
              Seleccionamos cuidadosamente cada ingrediente
              para garantizar el sabor, la textura y la calidad
              que nos caracterizan.
            </p>
          </div>

          {/* DECORATIVE TEXT */}

          <div
            className={styles.decorativeText}
            aria-hidden="true"
          >
            <span>
              Ingredientes
              <br />
              simples,
              <br />
              resultados únicos.
            </span>

            <span className={styles.decorativeLine} />
          </div>

        </div>

        {/* ========================================
            INGREDIENTS GRID
        ======================================== */}

        <div className={styles.ingredientsGrid}>
          {ingredients.map((ingredient) => (
            <article
              key={ingredient.id}
              className={styles.ingredientCard}
            >

              {/* INGREDIENT ILLUSTRATION */}

              <div className={styles.imageWrapper}>
                <Image
                  src={ingredient.image}
                  alt={`Mascota de ${ingredient.name}`}
                  fill
                  sizes="
                    (max-width: 767px) 100px,
                    (max-width: 1023px) 160px,
                    200px
                  "
                  className={styles.image}
                />
              </div>

              {/* INGREDIENT INFORMATION */}

              <div className={styles.ingredientContent}>

                <h3 className={styles.ingredientName}>
                  {ingredient.name}
                </h3>

                <p className={styles.ingredientDescription}>
                  {ingredient.description}
                </p>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}