"use client";

import React from "react";
import dynamic from "next/dynamic";

// SSR fix for react-simple-maps
const MapChart = dynamic(() => import("./MapChart"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-slate-50 animate-pulse rounded-xl flex items-center justify-center">
      <span className="text-slate-400 text-sm">Loading map data...</span>
    </div>
  )
});

export default function GeospatialSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-6 transition-all duration-300">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden p-6 md:p-8 relative">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '25px' }}>
          <h2 className="text-[#15CEFF] text-[28px] font-medium leading-tight max-w-[496px] mx-auto tracking-normal">
            Geospatial Client Engagement
          </h2>
        </div>

        {/* Map Container */}
        <div className="w-full h-auto overflow-hidden">
          <MapChart />
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50/50 rounded-bl-full -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-50/30 rounded-tr-full -z-10" />
      </div>
    </section>
  );
}
