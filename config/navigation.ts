export interface NavigationItem {
  label: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Nuestra historia",
    href: "/nuestra-historia",
  },
  {
    label: "Productos",
    href: "/productos",
  },
  {
    label: "Nuestro local",
    href: "/nuestro-local",
  },
  {
    label: "Franquicias",
    href: "/franquicias",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
];

export const franchiseCTA: NavigationItem = {
  label: "Abre tu franquicia",
  href: "/abre-tu-franquicia",
};