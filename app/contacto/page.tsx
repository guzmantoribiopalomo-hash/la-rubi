import ContactHero from "@/components/sections/contact/ContactHero/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo/ContactInfo";
import ContactValues from "@/components/sections/contact/ContactValues/ContactValues";

export default function ContactoPage() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <ContactValues />
    </main>
  );
}