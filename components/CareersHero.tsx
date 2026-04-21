"use client";

import React from "react";

export function CareersHero() {
  return (
    <section className="relative w-full bg-white bg-opacity-95 overflow-hidden py-12 lg:py-20">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
           <h2 className="text-[#15CEFF] text-[28px] font-medium tracking-tight text-center">
             Embark on a journey of excellence ⚡
           </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          {/* Text content - CLONED FROM WhoWeAreHero */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-[650px]">
            <div className="text-black text-[18px] leading-[1.6] font-normal space-y-6">
              <p>
                We are an enterprising startup driven by a team of dedicated professionals. 
                Our commitment lies in delivering an array of comprehensive services to our esteemed clients.
              </p>
              <p>
                In line with this vision, we are actively seeking individuals who share our passion for technology, 
                thrive in learning novel concepts, and exhibit exceptional logical thinking and problem-solving acumen. 
                If you believe you align with our organizational ethos, kindly submit your resume.
              </p>
              <p>
                Our meticulous selection process entails multiple stages to ensure the right fit for both you and us.
              </p>
            </div>
          </div>

          {/* Hexagon Illustration - CLONED FROM WhoWeAreHero */}
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
              
              {/* Careers Illustration */}
              <div className="relative z-10 w-[60%] h-[60%] flex items-center justify-center">
                <img 
                  src="/careers/Group 592.svg" 
                  alt="Careers Journey Illustration"
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
