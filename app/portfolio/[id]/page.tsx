import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HowWeDo } from "@/components/HowWeDo";
import { MissionStatsCTA } from "@/components/MissionStatsCTA";
import { getPortfolioDetail } from "@/lib/content";
import { notFound } from "next/navigation";
import * as React from "react";

interface PortfolioDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { id } = await params;
  const project = await getPortfolioDetail(id);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - THAAYAKAM Portfolio`,
    description: project.shortDescription,
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = await params;
  const project = await getPortfolioDetail(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Header />
      
      <main className="flex-grow w-full flex flex-col pt-12 pb-24 gap-32">
        
        {/* --- HERO SECTION --- */}
        <section className="max-w-[1280px] mx-auto px-6 w-full pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Left Content */}
            <div className="flex flex-col gap-10">
              <div className="space-y-6">
                {/* Dashed Project Name Box */}
                <div className="relative inline-block px-4 py-2">
                  <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="#15CEFF" strokeWidth="2" strokeDasharray="6 6" className="animate-[marching-ants_1.5s_linear_infinite]" />
                  </svg>
                  <h1 className="text-[#15CEFF] text-[36px] font-semibold tracking-tight relative z-10 px-4 py-2">
                    {project.title}
                  </h1>
                </div>
                
                <h2 className="text-[#000000] text-[24px] font-bold leading-tight">
                  {project.category}
                </h2>
                <p className="text-black text-[20px] font-semibold leading-relaxed max-w-[500px]">
                  {project.shortDescription}
                </p>
              </div>

              {/* Offered Services Tags */}
              <div className="space-y-6">
                <h4 className="text-[#15CEFF] text-[18px] font-bold uppercase tracking-wide">
                  Offered Services:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.offeredServices?.map((service: string, i: number) => (
                    <div key={i} className="px-6 py-2 rounded-full border border-[#15CEFF] text-[#15CEFF] text-[14px] font-medium whitespace-nowrap">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Right Image (Floating Mockups) */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[600px] aspect-square rounded-[40px] bg-orange-100 flex items-center justify-center">
                 {/* Large floating center image or pattern */}
                 <div className="relative z-10 w-[80%] h-[80%] flex items-center justify-center">
                   {project.heroImage ? (
                     <img src={project.heroImage} alt="Hero Mockup" className="w-full h-full object-contain" />
                   ) : (
                     <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl border-8 border-gray-900"></div>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTRODUCTION SECTION --- */}
        <section className="max-w-[1280px] mx-auto px-6 w-full space-y-12">
          <div className="space-y-8">
            <div className="relative inline-block px-4 py-2">
               <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                 <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 6" />
               </svg>
               <h3 className="text-[#22C55E] text-[24px] font-semibold tracking-tight relative z-10 px-4 py-2">
                 Introduction
               </h3>
            </div>
            <p className="text-black text-[18px] leading-relaxed max-w-[1100px]" dangerouslySetInnerHTML={{ __html: project.introduction.text }} />
          </div>

          {/* Intro Large Image Area */}
          <div className="w-full aspect-[2/1] rounded-[40px] bg-orange-100 flex items-center justify-center overflow-hidden">
             {project.introduction.image ? (
               <img src={project.introduction.image} alt="Intro Image" className="w-[90%] h-[90%] object-contain" />
             ) : (
               <div className="flex gap-8">
                 {[1, 2, 3].map(n => (
                   <div key={n} className="w-32 h-64 bg-white rounded-2xl shadow-xl"></div>
                 ))}
               </div>
             )}
          </div>
        </section>

        {/* --- KEY FEATURES SECTION --- */}
        <section className="max-w-[1280px] mx-auto px-6 w-full space-y-16">
          <div className="space-y-8">
             <h3 className="text-[#22C55E] text-[24px] font-semibold tracking-tight">
               Key Features
             </h3>
             <div className="space-y-10 border-2 border-dashed border-[#15CEFF] p-8 lg:p-12 rounded-3xl">
                {project.keyFeatures.items.map((feature: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-black text-[18px] font-bold">
                      {feature.title}: <span className="font-normal text-gray-700">{feature.description}</span>
                    </h4>
                  </div>
                ))}
             </div>
          </div>

          {/* Features Large Image Area */}
          <div className="w-full aspect-[2/1] rounded-[40px] bg-orange-100 flex items-center justify-center overflow-hidden">
             {project.keyFeatures.image ? (
               <img src={project.keyFeatures.image} alt="Features Image" className="w-[90%] h-[90%] object-contain" />
             ) : (
               <div className="flex gap-8">
                 {[1, 2, 3].map(n => (
                   <div key={n} className="w-32 h-64 bg-white rounded-2xl shadow-xl"></div>
                 ))}
               </div>
             )}
          </div>
        </section>

        {/* --- CHALLENGE & SOLUTION SECTIONS --- */}
        <section className="max-w-[1280px] mx-auto px-6 w-full flex flex-col gap-24">
          {/* Challenge */}
          <div className="space-y-8">
            <div className="relative inline-block px-4 py-2">
               <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                 <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 6" />
               </svg>
               <h3 className="text-[#22C55E] text-[24px] font-semibold tracking-tight relative z-10 px-4 py-2">
                 Challenge
               </h3>
            </div>
            <div className="text-black text-[18px] leading-relaxed max-w-[1100px] whitespace-pre-wrap">
              {project.challenge}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <h3 className="text-[#22C55E] text-[24px] font-semibold tracking-tight">
              Our Solutions
            </h3>
            <div className="text-black text-[18px] leading-relaxed max-w-[1100px] whitespace-pre-wrap">
              {project.solution}
            </div>
          </div>
        </section>

        {/* Standard Content Sections */}
        <HowWeDo />
        <MissionStatsCTA showButtons={false} />

      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marching-ants {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 12; }
        }
      `}} />
    </div>
  );
}
