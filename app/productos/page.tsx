import type { Metadata } from "next";

import ProductsHero from "@/components/sections/products/ProductsHero/ProductsHero";
import ProductsCategories from "@/components/sections/products/ProductsCategories/ProductsCategories";
import ProductsTradition from "@/components/sections/products/ProductsTradition/ProductsTradition";
import ProductsCTA from "@/components/sections/products/ProductsCTA/ProductsCTA";

export const metadata: Metadata = {
  title: "Nuestros productos | Churrería La Rubí",

  description:
    "Descubre los churros artesanos, el chocolate caliente y las especialidades de Churrería La Rubí. Tradición y sabor desde 1930.",
};

export default function ProductosPage() {
  return (
    <main>
      <ProductsHero />
      <ProductsCategories />
      <ProductsTradition />
      <ProductsCTA />
    </main>
  );
}