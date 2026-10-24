import Image from "next/image";
import Link from "next/link";

import styles from "./ProductsCategories.module.scss";

/* ========================================
   PRODUCTS DATA
======================================== */

const products = [
  {
    id: 1,
    name: "Churros artesanos",
    description:
      "Crujientes por fuera y tiernos por dentro. Elaborados cada día con nuestra receta tradicional.",
    image: "/images/products/categories/productos-2-1.webp",
    href: "/productos/churros",
  },
  {
    id: 2,
    name: "Chocolate",
    description:
      "Cacao de alta calidad con textura densa y sabor intenso. El acompañamiento perfecto.",
    image: "/images/products/categories/productos-2-2.webp",
    href: "/productos/chocolate",
  },
  {
    id: 3,
    name: "Cafés y bebidas",
    description:
      "Cafés seleccionados y bebidas para disfrutar en cualquier momento del día.",
    image: "/images/products/categories/productos-2-3.webp",
    href: "/productos/cafes-y-bebidas",
  },
  {
    id: 4,
    name: "Especialidades",
    description:
      "Más que churros, una selección de elaboraciones tradicionales y sabores únicos.",
    image: "/images/products/categories/productos-2-4.webp",
    href: "/productos/especialidades",
  },
];

/* ========================================
   COMPONENT
======================================== */

export default function ProductsCategories() {
  return (
    <section
      className={styles.categories}
      aria-labelledby="products-categories-title"
    >
      <div className={styles.container}>

        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className={styles.header}>

          {/* TITLE */}

          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              NUESTRA SELECCIÓN
            </span>

            <h2
              id="products-categories-title"
              className={styles.title}
            >
              Nuestros productos
            </h2>
          </div>

          {/* DESCRIPTION */}

          <p className={styles.intro}>
            Una propuesta tradicional y auténtica,
            elaborada con la misma receta familiar
            que nos acompaña desde 1930.
          </p>

          {/* MASCOT */}

          <div className={styles.mascotWrapper}>
            <Image
              src="/images/home/history/pet01.webp"
              alt="Mascota de La Rubí"
              fill
              sizes="(max-width: 767px) 100px, 160px"
              className={styles.mascot}
            />

            <div
              className={styles.mascotMessage}
              aria-label="Sin conservantes ni colorantes"
            >
              SIN
              <br />
              CONSERVANTES,
              <br />
              NI COLORANTES
            </div>
          </div>

        </div>

        {/* ========================================
            PRODUCTS GRID
        ======================================== */}

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <article
              key={product.id}
              className={styles.productCard}
            >
              <Link
                href={product.href}
                className={styles.productLink}
                aria-label={`Descubrir ${product.name}`}
              >

                {/* IMAGE */}

                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="
                      (max-width: 767px) 100px,
                      (max-width: 1023px) 45vw,
                      22vw
                    "
                    className={styles.image}
                  />
                </div>

                {/* CONTENT */}

                <div className={styles.productContent}>
                  <h3 className={styles.productName}>
                    {product.name}
                  </h3>

                  <p className={styles.productDescription}>
                    {product.description}
                  </p>

                  {/* DESKTOP BUTTON */}

                  <span className={styles.productButton}>
                    VER MÁS
                  </span>
                </div>

                {/* MOBILE ARROW */}

                <span
                  className={styles.mobileArrow}
                  aria-hidden="true"
                >
                  →
                </span>

              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}