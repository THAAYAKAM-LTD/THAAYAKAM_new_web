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
        <div className="max-w-[1280px] mx-auto px-6 text-center space-y-8">
          <h1 className="text-[#15CEFF] text-[32px] font-semibold tracking-tight">
            {page.title}
          </h1>
          <p className="text-[#000000] text-[20px] font-semibold max-w-[800px] mx-auto leading-relaxed">
            {page.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-[1280px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((item: any) => (
              <Link 
                key={item.id} 
                href={`/portfolio/${item.id}`}
                className="group flex flex-col bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image Placeholder/Thumbnail */}
                <div className="relative aspect-[4/3] bg-[#E0F7FF] flex items-center justify-center overflow-hidden">
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
                <div className="p-10 flex flex-col gap-4">
                  <div className="text-[#15CEFF] text-[16px] font-medium tracking-tight">
                    {item.category}
                  </div>
                  <h3 className="text-[#15CEFF] text-[22px] font-bold">
                    {item.title}
                  </h3>
                  <p className="text-black text-[16px] font-bold leading-relaxed mb-4">
                    {item.shortDescription}
                  </p>
                  
                  {/* Meta: Country */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-gray-500 text-sm">
                    <span className="font-medium">{item.country}</span>
                    <span className="text-[#00D084] font-bold group-hover:translate-x-1 transition-transform">
                      Explore case study →
                    </span>
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
