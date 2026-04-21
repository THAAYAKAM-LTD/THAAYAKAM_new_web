import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowWeDo } from "@/components/HowWeDo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full">
        <Hero />
        <ClientLogos />
        <Services />
        <Testimonials />
        <HowWeDo />
      </main>
      <Footer />
    </div>
  );
}
