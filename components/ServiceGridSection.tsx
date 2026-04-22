"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

interface GridItem {
  title: string;
  description: string;
}

interface ServiceGridSectionProps {
  data: {
    title: string;
    subtitle: string;
    items: GridItem[];
    cta: string;
  };
}

export function ServiceGridSection({ data }: ServiceGridSectionProps) {
  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-12 lg:gap-16">
        
        {/* Header: Center Aligned */}
        <div className="text-center space-y-4">
          <h3 className="text-[#15CEFF] text-[28px] font-semibold tracking-tight">
            {data.title}
          </h3>
          <p className="text-[#000000] text-[20px] font-semibold">
            {data.subtitle}
          </p>
        </div>

        {/* Grid: 2x2 Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12 w-full max-w-[1000px]">
          {data.items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Icon Box: Blue Square with White Star */}
              <div className="shrink-0 w-[42px] h-[42px] rounded-[10px] bg-[#15CEFF] flex items-center justify-center text-white shadow-sm transition-transform duration-300 hover:rotate-12">
                <Star size={20} fill="white" />
              </div>
              
              {/* Text: Title and Description */}
              <div className="flex flex-col gap-3 pt-1">
                <h4 className="text-[#15CEFF] text-[16px] font-medium tracking-[0.04em]">
                  {item.title}
                </h4>
                <p className="text-[#000000] text-[16px] leading-relaxed font-normal max-w-[336px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button: Centered */}
        <div className="pt-4">
          <Link href="/contact">
            <Button variant="button-general" className="w-[224px] h-[40px] bg-[#15CEFF] hover:bg-[#00BCD4] text-white transition-all duration-300 flex items-center justify-center p-0">
              {data.cta}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
