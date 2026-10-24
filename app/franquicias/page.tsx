import FranchiseHero from "@/components/sections/franchise/FranchiseHero/FranchiseHero";
import FranchiseBenefits from "@/components/sections/franchise/FranchiseBenefits/FranchiseBenefits";
import FranchiseInvestment from "@/components/sections/franchise/FranchiseInvestment/FranchiseInvestment";
import FranchiseProcess from "@/components/sections/franchise/FranchiseProcess/FranchiseProcess"
import FranchiseRequirements from "@/components/sections/franchise/FranchiseRequirements/FranchiseRequirements"
import FranchiseFAQ from "@/components/sections/franchise/FranchiseFAQ/FranchiseFAQ"

import styles from "./page.module.scss";

export default function FranquiciasPage() {
  return (
    <main>
      <FranchiseHero />
      <FranchiseBenefits />
      <FranchiseInvestment />
      <FranchiseProcess />
      <div className={styles.informationSection}>
        <div className={styles.informationGrid}>
          <FranchiseRequirements />
          <FranchiseFAQ />
        </div>
      </div>
    </main>
  );
}