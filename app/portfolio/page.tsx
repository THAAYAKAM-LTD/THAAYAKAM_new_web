import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HowWeDo } from "@/components/HowWeDo";
import { getPortfolioContent } from "@/lib/content";
import Link from "next/link";
import * as React from "react";

export const metadata = {
  title: "Portfolio - THAAYAKAM LTD",
  description: "Explore our success stories and recent innovative projects.",
};

export default async function PortfolioPage() {
  const { page, items } = await getPortfolioContent();

  if (!page) return null;

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow w-full flex flex-col pt-12 gap-20 bg-white">
        
        {/* Page Header */}
        <div className="max-w-[1280px] mx-auto px-6 text-center space-y-4">
          <h1 className="text-[#15CEFF] text-[28px] font-normal tracking-tight">
            {page.title}
          </h1>
          <p className="text-black text-[20px] font-semibold max-w-[620px] mx-auto leading-relaxed">
            {page.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-[1072px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {items.map((item: any) => (
              <Link 
                key={item.id} 
                href={`/portfolio/${item.id}`}
                className="group flex flex-col w-full max-w-[512px] h-[537px] bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image Placeholder/Thumbnail */}
                <div className="relative w-full h-[336px] bg-[#E0F7FF] flex items-center justify-center overflow-hidden rounded-[20px]">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="text-brand-primary/20 font-black text-6xl rotate-[-12deg] select-none">
                      {item.title}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col gap-3">
                  <h3 className="text-[#15CEFF] text-[20px] font-normal tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-black text-[16px] font-normal">
                    {item.category}
                  </div>
                  <p className="text-black text-[18px] font-bold leading-snug">
                    {item.shortDescription}
                  </p>
                  
                  {/* Meta: Country */}
                  <div className="mt-auto pt-2 flex items-center text-black text-[16px]">
                    <span className="font-normal">{item.country}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Section: How we do! */}
        <HowWeDo />

      </main>

      <Footer />
    </div>
  );
}
