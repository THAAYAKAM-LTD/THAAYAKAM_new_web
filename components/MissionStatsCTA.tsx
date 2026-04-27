"use client";

import React from "react";
import { MoveRight } from "lucide-react";

export function MissionStatsCTA({ showButtons = true }: { showButtons?: boolean }) {
  return (
    <section className="w-full bg-[#15CEFF] py-16 md:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-8">
          <div className="flex flex-col items-center text-center text-white">
            <h2 className="text-[64px] md:text-[80px] font-bold leading-none mb-4">4+</h2>
            <p className="text-[16px] font-medium opacity-90">Successful Projects</p>
          </div>
          <div className="flex flex-col items-center text-center text-white border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
            <h2 className="text-[64px] md:text-[80px] font-bold leading-none mb-4">4+</h2>
            <p className="text-[16px] font-medium opacity-90">Satisfied Clients</p>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <h2 className="text-[64px] md:text-[80px] font-bold leading-none mb-4">4+</h2>
            <p className="text-[16px] font-medium opacity-90">Countries Served</p>
          </div>
        </div>

        {/* Pitch Text */}
        <div className="text-center mb-12 max-w-[1100px] mx-auto">
          <p className="text-white text-[23px] leading-[1.4] font-medium">
            Are you searching for a <span className="font-bold text-white">finest team</span> to take your idea to the ever active market? <br className="hidden md:block" />
            You are in a <span className="font-bold text-white">right place</span> to get gear-up!
          </p>
        </div>

        {/* Buttons */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/services" 
              className="w-full sm:w-auto px-14 py-3 bg-white text-[#15CEFF] font-bold text-lg rounded-xl 
              hover:bg-slate-50 transition-all shadow-xl hover:shadow-cyan-400/20 flex items-center justify-center gap-2 group"
            >
              Services
            </a>
            <a 
              href="/contact" 
              className="w-full sm:w-auto px-14 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl 
              hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Schedule a consultation
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
