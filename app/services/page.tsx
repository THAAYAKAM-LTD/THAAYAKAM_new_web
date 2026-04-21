import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { HowWeDo } from "@/components/HowWeDo";
import { Testimonials } from "@/components/Testimonials";
import { MissionStatsCTA } from "@/components/MissionStatsCTA";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Our Services - THAAYAKAM LTD",
  description: "Explore our wide range of high-performance innovative solutions, from Cloud Consultation to Mobile App and Web App Development.",
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col pt-0 gap-[48px] mb-24">
        <Services />
        <HowWeDo />
        <Testimonials />
        <MissionStatsCTA />
      </main>
      <Footer />
    </div>
  );
}
