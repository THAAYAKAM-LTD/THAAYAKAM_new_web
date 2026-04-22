"use client";

import * as React from "react";
import { Code2 } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
}

interface ServiceFeatureSectionProps {
  data: {
    title: string;
    description: string;
    items: FeatureItem[];
    illustration: string;
  };
}

export function ServiceFeatureSection({ data }: ServiceFeatureSectionProps) {
  return (
    <section className="w-full px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 lg:p-12 flex flex-col gap-[48px]">
          
          {/* Top: Title & Description */}
          <div className="flex flex-col gap-[19px]">
            <h3 className="text-[#15CEFF] text-[20px] font-semibold tracking-tight max-w-[240px]">
              {data.title}
            </h3>
            <p className="text-[#000000] text-[16px] leading-relaxed max-w-[951px]">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Feature Items List */}
            <div className="flex flex-col gap-8">
              {data.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className="shrink-0 w-[48px] h-[48px] rounded-[14px] bg-[#15CEFF] flex items-center justify-center text-white shadow-sm">
                    <Code2 size={24} />
                  </div>
                  {/* Feature Text */}
                  <div className="flex flex-col gap-[19px]">
                    <h4 className="text-[#22C55E] text-[16px] font-medium tracking-[0.04em]">
                      {item.title}
                    </h4>
                    <p className="text-[#000000] text-[16px] leading-relaxed max-w-[454px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Illustration Square Shape */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-[256px] h-[256px] rounded-2xl border-2 border-dashed border-[#15CEFF] flex items-center justify-center overflow-hidden bg-white shadow-lg">
                <img 
                  src={data.illustration} 
                  alt={data.title}
                  className="w-full h-full object-contain p-6"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
