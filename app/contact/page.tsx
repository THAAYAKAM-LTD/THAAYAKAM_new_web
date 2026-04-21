"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";
import { EmailEnquiry } from "@/components/EmailEnquiry";
import { TrustedAllies } from "@/components/TrustedAllies";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col gap-[48px] pt-16 mb-24">
        <ContactHero />
        <ContactForm />
        <EmailEnquiry />
        <TrustedAllies />
      </main>
      <Footer />
    </div>
  );
}
