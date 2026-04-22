"use client";

import * as React from "react";
import Link from "next/link";
import { Cloud, Smartphone, Code2, Paintbrush, HelpCircle } from "lucide-react";

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ServicesProps {
  data?: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud size={30} strokeWidth={1.5} />,
  Smartphone: <Smartphone size={30} strokeWidth={1.5} />,
  Code2: <Code2 size={30} strokeWidth={1.5} />,
  Paintbrush: <Paintbrush size={30} strokeWidth={1.5} />,
};

const ServiceCard = ({ id, icon, title, description, features }: any) => (
  <div className="relative bg-white rounded-[32px] border border-gray-100 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col gap-6 h-full group hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
    {/* Title + Icon row */}
    <div className="flex items-start justify-between gap-4 z-20">
      <h4 className="text-[#15CEFF] font-bold text-[22px] leading-tight tracking-tight">
        {title}
      </h4>
      <div className="shrink-0 w-16 h-16 rounded-full bg-white border border-cyan-50 border-opacity-50 shadow-sm flex items-center justify-center text-[#15CEFF] group-hover:scale-110 transition-transform duration-300">
        {iconMap[icon] || <HelpCircle size={30} strokeWidth={1.5} />}
      </div>
    </div>

    {/* Description */}
    <p className="text-black text-[15px] md:text-[16px] leading-[1.6] font-normal flex-1 z-20 opacity-90">
      {description}
    </p>

    {/* Feature list */}
    <ul className="space-y-3 mt-2 z-20">
      {features.map((f: string) => (
        <li key={f} className="text-[17px] font-bold text-black flex items-center gap-2">
          {f}
        </li>
      ))}
    </ul>

    {/* Explore link - Bottom Right */}
    <div className="flex justify-end mt-6 z-20">
      <Link href={`/services/${id}`}>
        <button className="text-[#00D084] text-[17px] font-semibold hover:translate-x-1 transition-all flex items-center gap-1 group/btn">
          Explore
          <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-1">→</span>
        </button>
      </Link>
    </div>
  </div>
);

export function Services({ data }: ServicesProps) {
  // If no data provided, we could fetch here, but better to pass from page
  if (!data) return null;

  return (
    <section id="services" className="relative w-full overflow-hidden bg-white pt-8 lg:pt-12 pb-16 lg:pb-24">
      {/* Subtle background dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-[#15CEFF] text-[32px] font-semibold tracking-tight">
            {data.title}
          </h2>
          <p className="text-[#000000] text-[20px] max-w-[789px] leading-[1.4] font-semibold">
            {data.subtitle}
          </p>
        </div>

        {/* Cards — Dynamic Responsive Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {data.items.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-20 z-20">
          <Link href="/contact">
            <button className="px-10 py-4 rounded-[10px] bg-[#15CEFF] text-white font-bold text-[18px] hover:bg-[#00b4d8] transition-all shadow-lg hover:shadow-cyan-100">
              Schedule a consultation 📅
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
