"use client";

import * as React from "react";

const clients = [
  { name: "Sail IndSri", logo: "/clients/Group 431 1.svg" },
  { name: "IYKONS", logo: "/clients/Logo 1.svg" },
  { name: "PromoZon", logo: "/clients/finalised title without bg 1.svg" },
  { name: "Schooler.lk", logo: "/clients/logo-schooler-title 1.svg" },
  { name: "British Tamils Cricket League", logo: "/clients/Group 659.svg" },
  { name: "Tekvantis", logo: "/clients/output-onlinepngtools 1 (1).svg" },
  { name: "New Pitch", logo: "/clients/Frame 630.svg" },
  { name: "Thamilalayam Berlin", logo: "/clients/Group.svg" },
  { name: "EcolifeAus", logo: "/clients/image 1.svg" },
];

export function ClientLogos() {
  // Multiply the array to create a seamless infinite loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="w-full bg-white pt-12 overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-left,
        .pause-on-hover:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-[#15CEFF] text-[28px] font-bold text-center mb-3">
            Clients Trust Us
          </h2>
          <div className="w-[60px] h-0.5 bg-[#15CEFF]" />
        </div>

        {/* Carousel Card Container */}
        <div className="rounded-2xl border border-cyan-100 bg-white p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,255,255,0.03)] relative overflow-hidden">
          
          <div className="flex flex-col gap-8 pause-on-hover">
            
            {/* Row 1: Scrolls Left */}
            <div className="flex overflow-hidden relative group">
              <div className="flex animate-scroll-left gap-8">
                {duplicatedClients.map((client, idx) => (
                  <div 
                    key={`r1-${idx}`}
                    className="flex-shrink-0 px-6 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-cyan-300 hover:shadow-md hover:scale-105 transition-all duration-300 group/card cursor-default min-w-[200px] flex items-center justify-center"
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="h-10 w-auto object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Scrolls Right */}
            <div className="flex overflow-hidden relative group">
              <div className="flex animate-scroll-right gap-8">
                {duplicatedClients.map((client, idx) => (
                  <div 
                    key={`r2-${idx}`}
                    className="flex-shrink-0 px-6 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-cyan-300 hover:shadow-md hover:scale-105 transition-all duration-300 group/card cursor-default min-w-[200px] flex items-center justify-center"
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="h-10 w-auto object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Fading Edges Overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

        {/* Bottom Accent Dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00BFFF]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
        </div>

      </div>
    </section>
  );
}
