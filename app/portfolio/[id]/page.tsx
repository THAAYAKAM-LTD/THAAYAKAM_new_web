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
      
      <main className="flex-grow w-full flex flex-col pt-4 pb-24 gap-12">
        
        {/* --- HERO SECTION --- */}
        <section className="max-w-[1280px] mx-auto px-6 w-full pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Left Content */}
            <div className="flex flex-col gap-4">
              <div className="space-y-4">
                <div className="relative inline-block">
                  <h1 className="text-[#15CEFF] text-[28px] font-semibold tracking-tight">
                    {project.title}
                  </h1>
                </div>
                
                <h2 className="text-[#000000] text-[20px] font-medium leading-tight">
                  {project.category}
                </h2>
                <p className="text-black text-[16px] font-normal leading-relaxed max-w-[369px]">
                  {project.shortDescription}
                </p>
              </div>

              {/* Offered Services Tags */}
              <div className="space-y-4">
                <h4 className="text-[#15CEFF] text-[16px] font-semibold uppercase tracking-wide">
                  Offered Services:
                </h4>
                <div className="flex flex-wrap gap-4">
                  {project.offeredServices?.map((service: string, i: number) => (
                    <div key={i} className="px-4 py-2 rounded-[21.5px] border border-[#15CEFF] text-[#15CEFF] text-[12px] font-normal tracking-[0.07em] whitespace-nowrap uppercase">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] h-[368px] flex items-center justify-center overflow-hidden">
                 {/* Large floating center image or pattern */}
                 <div className="relative z-10 w-full h-full flex items-center justify-center">
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
            <div className="relative inline-block">
               <h3 className="text-[#41D692] text-[28px] font-normal tracking-tight">
                 Introduction
               </h3>
            </div>
            <p className="text-black text-[16px] leading-relaxed max-w-[1072px]" dangerouslySetInnerHTML={{ __html: project.introduction.text }} />
          </div>

          {/* Intro Large Image Area */}
          <div className="w-full max-w-[922px] aspect-[922/447] mx-auto flex items-center justify-center overflow-hidden">
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
        <section className="max-w-[1280px] mx-auto px-6 w-full space-y-12">
          <div className="space-y-8">
             <h3 className="text-[#41D692] text-[28px] font-normal tracking-tight">
               Key Features
             </h3>
             <div className="space-y-4 p-2">
                {project.keyFeatures.items.map((feature: any, i: number) => (
                  <div key={i} className="max-w-[1072px]">
                    <p className="text-black text-[16px] leading-relaxed">
                      <span className="font-semibold">{feature.title}:</span> <span className="font-normal">{feature.description}</span>
                    </p>
                  </div>
                ))}
             </div>
          </div>

          {/* Features Large Image Area */}
          <div className="w-full max-w-[922px] aspect-[922/447] mx-auto flex items-center justify-center overflow-hidden">
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
            <div className="relative inline-block">
               <h3 className="text-[#41D692] text-[28px] font-normal tracking-tight">
                 Challenge
               </h3>
            </div>
            <div className="text-black text-[16px] leading-relaxed max-w-[1072px] whitespace-pre-wrap">
              {project.challenge}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <h3 className="text-[#41D692] text-[28px] font-normal tracking-tight">
              Our Solutions
            </h3>
            <div className="text-black text-[16px] leading-relaxed max-w-[1072px] whitespace-pre-wrap">
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
