"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  navigation,
  franchiseCTA,
} from "@/config/navigation";

import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* LOGOTIPO */}
        <Link
            href="/"
            className={styles.logo}
            aria-label="Churrería La Rubí - Inicio"
            onClick={closeMenu}
        >
            <Image
                src="/images/brand/logo-la-rubi.png"
                alt="Churrería La Rubí"
                width={220}
                height={80}
                priority
            />
        </Link>

        {/* NAVEGACIÓN */}
        <nav
          id="main-navigation"
          className={`${styles.navigation} ${
            isMenuOpen ? styles.navigationOpen : ""
          }`}
          aria-label="Navegación principal"
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
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA MOBILE */}
          <Link
            href={franchiseCTA.href}
            className={styles.mobileCTA}
            onClick={closeMenu}
          >
            {franchiseCTA.label}
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        {/* CTA DESKTOP */}
        <Link
          href={franchiseCTA.href}
          className={styles.desktopCTA}
        >
          {franchiseCTA.label}
          <span aria-hidden="true">→</span>
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          type="button"
          className={`${styles.menuToggle} ${
            isMenuOpen ? styles.menuToggleOpen : ""
          }`}
          aria-label={
            isMenuOpen ? "Cerrar menú" : "Abrir menú"
          }
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}