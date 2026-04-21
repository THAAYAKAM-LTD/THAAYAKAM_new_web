import { Header } from "@/components/Header";
import { CareersHero } from "@/components/CareersHero";
import { ShareResumeSection } from "@/components/ShareResumeSection";
import { MissionStatsCTA } from "@/components/MissionStatsCTA";
import { Footer } from "@/components/Footer";
import { getPageContent } from "@/lib/content";

export const metadata = {
  title: "Careers - THAAYAKAM LTD",
  description: "Join our team of dedicated professionals and embark on a journey of excellence. We are looking for passionate problem-solvers to build impactful global solutions.",
};

export default async function CareersPage() {
  const content = await getPageContent("careers");

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col pt-16 mb-24">
        <CareersHero data={content?.hero} />
        <ShareResumeSection data={content?.recruitment} />
        <MissionStatsCTA />
        {/* Recruitment specific sections like Job Openings can be added here */}
      </main>
      <Footer />
    </div>
  );
}
