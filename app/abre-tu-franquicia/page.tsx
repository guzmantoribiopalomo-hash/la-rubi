import type { Metadata } from "next";

import FranchiseApplicationHero from "@/components/sections/franchise-application/FranchiseApplicationHero/FranchiseApplicationHero";
import FranchiseApplicationStats from "@/components/sections/franchise-application/FranchiseApplicationStats/FranchiseApplicationStats";
import FranchiseApplicationForm from "@/components/sections/franchise-application/FranchiseApplicationForm/FranchiseApplicationForm";

export const metadata: Metadata = {
  title: "Abre tu franquicia | Churrería La Rubí",
  description:
    "Forma parte de Churrería La Rubí. Descubre nuestro proyecto de franquicias y lleva nuestra tradición artesana a nuevos lugares.",
};

export default function AbreTuFranquiciaPage() {
  return (
    <main>
      <FranchiseApplicationHero />
      <FranchiseApplicationStats />
      <FranchiseApplicationForm />
    </main>
  );
}