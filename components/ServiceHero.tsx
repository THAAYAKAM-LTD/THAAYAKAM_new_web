"use client";

import * as React from "react";
import { Button } from "./Button";
import Link from "next/link";

interface ServiceHeroProps {
  data?: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    cta: string;
    illustration: string;
  };
}

export function ServiceHero({ data }: ServiceHeroProps) {
  if (!data) return null;

  return (
    <section className="w-full bg-white relative overflow-hidden pt-[48px]">
      {/* Subtle background dot grid to match site style */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-8">
              <h1 className="text-[#15CEFF] text-[28px] font-medium tracking-tight max-w-[489px]">
                {data.title}
              </h1>
              <h2 className="text-[#000000] text-[20px] font-normal leading-tight max-w-[334px]">
                {data.subtitle}
              </h2>
            </div>

            <div>
              <Link href="/contact">
                <Button variant="button-general" className="w-[224px] h-[40px] bg-[#15CEFF] hover:bg-[#00BCD4] text-white border-none shadow-sm transition-all duration-300 flex items-center justify-center p-0">
                  {data.cta}
                </Button>
              </Link>
            </div>

            <div className="text-[#000000] text-[16px] font-normal leading-relaxed text-left max-w-[596px] space-y-8">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Hexagonal Illustration */}
          <div className="relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <style>
                  {`
                    @keyframes marching-ants {
                      from { stroke-dashoffset: 0; }
                      to { stroke-dashoffset: 10; }
                    }
                    .animate-marching-ants {
                      stroke-dasharray: 5 5;
                      animation: marching-ants 1.5s linear infinite;
                    }
                  `}
                </style>
                {/* 1. OUTER SOLID LINE */}
                <path
                  d="M 43, 6
                     Q 50, 2, 57, 6
                     L 85.5, 22
                     Q 91.5, 26, 91.5, 34
                     L 91.5, 66
                     Q 91.5, 74, 85.5, 78
                     L 57, 94
                     Q 50, 98, 43, 94
                     L 14.5, 78
                     Q 8.5, 74, 8.5, 66
                     L 8.5, 34
                     Q 8.5, 26, 14.5, 22
                     Z"
                  fill="white"
                  fillOpacity="0.8"
                  stroke="#E5E7EB"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* 2. OUTER ANIMATED DASHED LINE */}
                <path
                  d="M 43, 6
                     Q 50, 2, 57, 6
                     L 85.5, 22
                     Q 91.5, 26, 91.5, 34
                     L 91.5, 66
                     Q 91.5, 74, 85.5, 78
                     L 57, 94
                     Q 50, 98, 43, 94
                     L 14.5, 78
                     Q 8.5, 74, 8.5, 66
                     L 8.5, 34
                     Q 8.5, 26, 14.5, 22
                     Z"
                  fill="none"
                  stroke="#15CEFF"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="animate-marching-ants"
                  transform="scale(1.04)"
                  style={{ transformOrigin: "center" }}
                />
              </svg>
              
              {/* Illustration */}
              <div className="relative z-10 w-[70%] h-[70%] flex items-center justify-center">
                <img 
                  src={data.illustration} 
                  alt={data.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
