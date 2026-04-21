"use client";

import * as React from "react";

const allies = [
  { name: "IYKONS", logo: "/clients/Logo 1.svg" },
  { name: "PromoZon", logo: "/clients/finalised title without bg 1.svg" },
  { name: "Tekvantis", logo: "/clients/output-onlinepngtools 1 (1).svg" },
  { name: "World Migratio", logo: "/clients/Frame 630.svg" }, // Using Frame 630 as a placeholder for World Migratio if not found
  { name: "Thamilalayam Berlin", logo: "/clients/Group.svg" },
  { name: "British Tamils Cricket League", logo: "/clients/Group 659.svg" },
];

export function TrustedAllies() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#15CEFF] text-[28px] font-medium tracking-tight">
            Our trusted allies
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="bg-white rounded-[24px] border-2 border-gray-100 p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16">
            {allies.map((ally) => (
              <div 
                key={ally.name}
                className="w-[200px] flex items-center justify-center group"
              >
                <img 
                  src={ally.logo} 
                  alt={ally.name} 
                  className="max-h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
