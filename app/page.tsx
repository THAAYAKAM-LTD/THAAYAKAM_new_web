import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowWeDo } from "@/components/HowWeDo";
import { Footer } from "@/components/Footer";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const content = await getSiteContent();
  const homeData = content?.pages?.home;
  const servicesData = content?.pages?.services;

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col gap-[48px] mb-24">
        {/* Pass dynamic data to Hero and Services */}
        <Hero data={homeData?.hero} />
        <ClientLogos />
        <Services data={servicesData} />
        <Testimonials />
        <HowWeDo />
      </main>
      <Footer />
    </div>
  );
}
