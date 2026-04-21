"use client";

import React from "react";

interface FuturePoint {
  heading: string;
  text: string;
}

interface OurFutureSectionProps {
  data?: {
    title: string;
    subtitle: string;
    points: FuturePoint[];
  };
}

export function OurFutureSection({ data }: OurFutureSectionProps) {
  if (!data) return null;

  return (
    <section className="relative w-full bg-white py-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-[650px]">
            <div className="space-y-6">
              <h2 className="text-[#15CEFF] text-[28px] font-medium tracking-tight">
                {data.title}
              </h2>
              <div className="text-black text-[18px] leading-[1.6] font-normal space-y-8">
                <p>
                  {data.subtitle}
                </p>

                {data.points.map((point, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-bold">{point.heading}</h3>
                    <p>{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hexagonal Illustration */}
          <div className="relative flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-[550px] h-[495px] flex items-center justify-center translate-x-[20px]">
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
                {/* Outer Hexagon Line */}
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
                {/* Cyan Animated Line */}
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
              <div className="relative z-10 w-[50%] h-[50%] flex items-center justify-center">
                <img 
                  src="/who_we_are/undraw_team_spirit_re_yl1v.svg" 
                  alt="Our Future Illustration"
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
