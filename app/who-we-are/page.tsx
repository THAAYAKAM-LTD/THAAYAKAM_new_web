import { Header } from "@/components/Header";
import { WhoWeAreHero } from "@/components/WhoWeAreHero";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { HowWeDo } from "@/components/HowWeDo";
import { OurFutureSection } from "@/components/OurFutureSection";
import { MissionStatsCTA } from "@/components/MissionStatsCTA";
import { Footer } from "@/components/Footer";
import GeospatialSection from "@/components/GeospatialSection";
import { getPageContent } from "@/lib/content";

export const metadata = {
  title: "Who We Are - THAAYAKAM LTD",
  description: "Learn about the mission, journey, and dedicated team at THAAYAKAM LTD, driving innovation in digital solutions since 2021.",
};

export default async function WhoWeArePage() {
  const content = await getPageContent("whoWeAre");

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col gap-[48px] pt-16 mb-24">
        <WhoWeAreHero data={content?.hero} />
        <GeospatialSection />
        <WhatWeDoSection />
        <HowWeDo />
        {/* Pass the future data from CMS */}
        <OurFutureSection data={content?.future} />
        <MissionStatsCTA />
      </main>
      <Footer />
    </div>
  );
}
