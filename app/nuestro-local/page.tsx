import LocalHero from "@/components/sections/local/LocalHero/LocalHero";
import LocalValues from "@/components/sections/local/LocalValues/LocalValues";
import LocalExperience from "@/components/sections/local/LocalExperience/LocalExperience";
import LocalLocation from "@/components/sections/local/LocalLocation/LocalLocation";
import LocalCTA from "@/components/sections/local/LocalCTA/LocalCTA";

export default function NuestroLocalPage() {
  return (
    <main>
      <LocalHero />
      <LocalValues />
      <LocalExperience />
      <LocalLocation />
      <LocalCTA />
    </main>
  );
}