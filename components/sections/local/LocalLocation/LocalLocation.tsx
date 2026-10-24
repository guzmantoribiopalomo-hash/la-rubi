import {
  MapPin,
  Clock3,
  Phone
} from "lucide-react";

import { FaInstagram } from "react-icons/fa6";

import styles from "./LocalLocation.module.scss";

/* ========================================
   LOCAL DATA
======================================== */

const location = {
  name: "Churrería La Rubí",

  city: "Camuñas, Toledo",

  address: "Calle Empedrada, 13",
  postalCode: "45720",

  phone: "690791425",

  instagram: "@churrerialarubi",
  instagramUrl: "https://www.instagram.com/churrerialarubi/",

  schedule: {
    openingDays: "Sábados y domingos",
    openingHours: "7:30 – 12:00",
    closedDays: "Lunes a viernes: cerrado",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Churrer%C3%ADa+La+Rub%C3%AD+Calle+Empedrada+13+Camu%C3%B1as+Toledo",

  mapsEmbedUrl:
    "https://www.google.com/maps?q=Calle+Empedrada+13,+45720+Camu%C3%B1as,+Toledo&output=embed",
};

/* ========================================
   LOCAL LOCATION
======================================== */

export default function LocalLocation() {
  return (
    <section
      id="ubicacion"
      className={styles.location}
      aria-labelledby="local-location-title"
    >
      <div className={styles.container}>

        {/* ========================================
            INTRODUCTION
        ======================================== */}

        <div className={styles.content}>

          {/* EYEBROW */}

          <span className={styles.eyebrow}>
            DÓNDE ENCONTRARNOS
          </span>

          {/* TITLE */}

          <h2
            id="local-location-title"
            className={styles.title}
          >
            Estamos en
            <br />
            Camuñas
          </h2>

          {/* DESCRIPTION */}

          <p className={styles.description}>
            En el corazón de Camuñas te esperamos cada
            fin de semana con nuestros churros recién
            hechos y el auténtico sabor de una tradición
            familiar de cinco generaciones.
          </p>

          {/* MAP BUTTON */}

<a
  href={location.mapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.button}
  aria-label="Cómo llegar a Churrería La Rubí con Google Maps"
>
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>

  CÓMO LLEGAR
</a>

        </div>

        {/* ========================================
            CONTACT INFORMATION
        ======================================== */}

        <div className={styles.information}>

          {/* ADDRESS */}

          <div className={styles.infoItem}>

            <MapPin
              className={styles.icon}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <div className={styles.infoContent}>

              <h3 className={styles.infoTitle}>
                DIRECCIÓN
              </h3>

              <p className={styles.infoText}>
                {location.address}
                <br />
                {location.postalCode} {location.city}
              </p>

            </div>
          </div>

          {/* SCHEDULE */}

          <div className={styles.infoItem}>

            <Clock3
              className={styles.icon}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <div className={styles.infoContent}>

              <h3 className={styles.infoTitle}>
                HORARIO
              </h3>

              <p className={styles.infoText}>
                {location.schedule.openingDays}
                <br />
                {location.schedule.openingHours}
                <br />

                <span className={styles.closedDays}>
                  {location.schedule.closedDays}
                </span>
              </p>

            </div>
          </div>

          {/* PHONE */}

          {location.phone && (
            <div className={styles.infoItem}>

              <Phone
                className={styles.icon}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <div className={styles.infoContent}>

                <h3 className={styles.infoTitle}>
                  TELÉFONO
                </h3>

                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className={styles.infoLink}
                >
                  {location.phone}
                </a>

              </div>
            </div>
          )}

          {/* INSTAGRAM */}

          <div className={styles.infoItem}>

            <FaInstagram
                className={styles.icon}
                aria-hidden="true"
            />

            <div className={styles.infoContent}>

              <h3 className={styles.infoTitle}>
                SÍGUENOS
              </h3>

              <a
                href={location.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                {location.instagram}
              </a>

            </div>
          </div>

        </div>

        {/* ========================================
            MAP
        ======================================== */}

        <div className={styles.mapWrapper}>

          <iframe
            src={location.mapsEmbedUrl}
            title={`Ubicación de ${location.name} en Camuñas, Toledo`}
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

        </div>

      </div>
    </section>
  );
}