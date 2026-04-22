import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceFeatureSection } from "@/components/ServiceFeatureSection";
import { ServiceGridSection } from "@/components/ServiceGridSection";
import { HowWeDo } from "@/components/HowWeDo";
import { MissionStatsCTA } from "@/components/MissionStatsCTA";
import { getServiceDetail } from "@/lib/content";
import { notFound } from "next/navigation";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await getServiceDetail(id);
  
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} - THAAYAKAM LTD`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await getServiceDetail(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full flex flex-col pt-0 gap-[48px] mb-24">
        <ServiceHero data={service} />
        
        {/* Dynamic Sections */}
        {service.sections?.map((section: any) => {
          if (section.type === "feature-list") {
            return <ServiceFeatureSection key={section.id} data={section} />;
          }
          if (section.type === "grid-features") {
            return <ServiceGridSection key={section.id} data={section} />;
          }
          if (section.type === "process") {
            return <HowWeDo key={section.id} />;
          }
          if (section.type === "stats") {
            return <MissionStatsCTA key={section.id} showButtons={false} />;
          }
          return null;
        })}

        {/* We can add more sections here like Process, etc. */}
      </main>
      <Footer />
    </div>
  );
}
