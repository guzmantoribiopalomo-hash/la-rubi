"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

import { navigation, franchiseCTA } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import styles from "./Footer.module.scss";

const legalLinks = [
  {
    label: "Aviso legal",
    href: "/aviso-legal",
  },
  {
    label: "Política de privacidad",
    href: "/politica-privacidad",
  },
  {
    label: "Política de cookies",
    href: "/politica-cookies",
  },
];

export default function Footer() {
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* LOGOTIPO */}
        <div className={styles.brand}>
          <Link
            href="/"
            aria-label="Churrería La Rubí - Inicio"
          >
            <Image
              src="/images/brand/logo-la-rubi.png"
              alt="Churrería La Rubí"
              width={150}
              height={70}
            />
          </Link>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav
          className={styles.navigation}
          aria-label="Navegación del pie de página"
        >
          <ul className={styles.navigationList}>
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navigationLink} ${
                      isActive ? styles.active : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* REDES SOCIALES */}
        <div className={styles.social}>
          <Link
            href={siteConfig.social.instagram}
            aria-label="Instagram de Churrería La Rubí"
          >
            <FaInstagram />
          </Link>

          <Link
            href={siteConfig.social.facebook}
            aria-label="Facebook de Churrería La Rubí"
          >
            <FaFacebookF />
          </Link>
        </div>

        {/* CTA FRANQUICIAS */}
        <div className={styles.franchise}>
          <Link
            href={franchiseCTA.href}
            className={styles.franchiseButton}
          >
            {franchiseCTA.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* INFORMACIÓN LEGAL */}
        <div className={styles.legal}>
          <p className={styles.copyright}>
            © {currentYear} {siteConfig.name}.
            Todos los derechos reservados.
          </p>

          <nav aria-label="Enlaces legales">
            <ul className={styles.legalLinks}>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}