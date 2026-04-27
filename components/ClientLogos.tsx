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
    <section className="w-full pt-12 overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-left {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-[#15CEFF] text-[28px] font-bold text-center">
            Clients Trust Us
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-8 pause-on-hover">
            {/* Single Row: Scrolls Left */}
            <div className="flex overflow-hidden relative group">
              <div className="flex animate-scroll-left gap-8">
                {duplicatedClients.map((client, idx) => (
                  <div 
                    key={`r1-${idx}`}
                    className="flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-300 group/card cursor-default min-w-[200px] flex items-center justify-center"
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
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
