import HomeHero from "@/components/sections/home/HomeHero/HomeHero";
import HomeValues from "@/components/sections/home/HomeValues/HomeValues";
import HomeHistory from "@/components/sections/home/HomeHistory/HomeHistory";
import HomeProducts from "@/components/sections/home/HomeProducts/HomeProducts";
import HomeLocation from "@/components/sections/home/HomeLocation/HomeLocation";
import HomeFranchises from "@/components/sections/home/HomeFranchises/HomeFranchises";
import HomeInstagram from "@/components/sections/home/HomeInstagram/HomeInstagram";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeValues />
      <HomeHistory />
      <HomeProducts />
      <HomeLocation />
      <HomeFranchises />
      <HomeInstagram />
    </main>
  );
}