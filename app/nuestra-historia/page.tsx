import HistoryHero from "@/components/sections/history/HistoryHero/HistoryHero";
import HistoryOrigins from "@/components/sections/history/HistoryOrigins/HistoryOrigins";
import HistoryGenerations from "@/components/sections/history/HistoryGenerations/HistoryGenerations";
import HistoryRecipe from "@/components/sections/history/HistoryRecipe/HistoryRecipe";
import HistoryFuture from "@/components/sections/history/HistoryFuture/HistoryFuture";

export default function NuestraHistoriaPage() {
  return (
    <main>
      <HistoryHero />
      <HistoryOrigins />
      <HistoryGenerations />
      <HistoryRecipe />
      <HistoryFuture />
    </main>
  );
}