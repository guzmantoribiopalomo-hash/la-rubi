import Image from "next/image";
import styles from "./FranchiseApplicationStats.module.scss";

const figures = [
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-1.webp",
    value: "+70",
    label: "Establecimientos",
  },
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-2.webp",
    value: "+600",
    label: "Empleados",
  },
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-3.webp",
    value: "+25.000",
    label: "Clientes diarios",
  },
];

const investment = [
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-4.webp",
    title: "Inversión necesaria",
    value: "Desde 150.000 €",
  },
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-5.webp",
    title: "Canon de entrada",
    value: "18.000 €",
  },
  {
    image: "/images/franchise-application/stats/abre-tu-franquicia-2-6.webp",
    title: "Royalty",
    value: "3,5 % sobre las ventas",
  },
];

export default function FranchiseApplicationStats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.figuresGrid}>
          {figures.map((item) => (
            <div className={styles.figure} key={item.label}>
              <div className={styles.figureImage}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 120px, 180px"
                />
              </div>

              <div className={styles.figureBadge}>
                <span className={styles.figureValue}>{item.value}</span>
                <span className={styles.figureLabel}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.investmentGrid}>
          {investment.map((item) => (
            <div className={styles.investmentItem} key={item.title}>
              <div className={styles.investmentImage}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100px, 160px"
                />
              </div>

              <h3 className={styles.investmentTitle}>{item.title}</h3>

              <p className={styles.investmentValue}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}