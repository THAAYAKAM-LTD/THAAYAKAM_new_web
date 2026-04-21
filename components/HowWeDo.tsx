"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepData {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  color: string;
}

const STEPS: StepData[] = [
  {
    number: "#1",
    title: "Scoping\n&\nEstimation",
    subtitle: "We understand your idea & needs",
    color: "#15CEFF",
    detail:
      "First things first! We Identify the scope of your project and study your plans & expectations to build a better vision of your idea. Then we assess your project to compose a project proposal document & we submit it to you for your review.",
  },
  {
    number: "#2",
    title: "Design\n&\nDevelopment",
    subtitle: "Crafting the Blueprint & Coding",
    color: "#00D084",
    detail:
      "Our experts translate the project proposal into high-fidelity UI/UX designs. Once approved, we move into the development phase, using modern tech stacks like React and Next.js to build a robust, scalable, and secure application tailored to your needs.",
  },
  {
    number: "#3",
    title: "Testing\n&\nDeployment",
    subtitle: "Ensuring Quality & Launching",
    color: "#3B82F6",
    detail:
      "Before launch, every feature undergoes rigorous manual and automated testing. Once we ensure peak performance and security, we deploy your solution using industry-standard CI/CD pipelines, providing a glitch-free experience for your users from day one.",
  },
  {
    number: "#4",
    title: "Maintenance\n&\nSupport",
    subtitle: "Continuous Growth & Monitoring",
    color: "#14B8A6",
    detail:
      "Our partnership doesn't end at launch. We provide ongoing maintenance, security updates, and performance monitoring to ensure your product grows with your business and remains ahead of the curve in a fast-changing market.",
  },
];

const HexagonStage = ({ 
  step, 
  isActive, 
  onClick 
}: { 
  step: StepData; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="relative flex flex-col items-center group transition-all duration-300 transform hover:scale-105"
  >
    <div className="relative w-[140px] h-[160px] md:w-[240px] md:h-[260px] flex flex-col items-center justify-start pt-8 md:pt-14">
      {/* Dashed Hexagon Border with Perfect Rounded Corners - Large UI Style */}
      <svg className="absolute inset-0 w-full h-full drop-shadow-sm transition-all duration-300" viewBox="0 0 100 115.47">
        <path
          d="M 50 2 Q 50 0 57 4 L 93 25 Q 100 29 100 38 L 100 77.47 Q 100 86.47 93 90.47 L 57 111.47 Q 50 115.47 43 111.47 L 7 90.47 Q 0 86.47 0 77.47 L 0 38 Q 0 29 7 25 L 43 4 Q 50 0 50 2 Z"
          fill="none"
          stroke={step.color}
          strokeWidth="0.5"
          strokeDasharray="4,4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-500 ${isActive ? "opacity-100 stroke-[1]" : "opacity-20 group-hover:opacity-40"}`}
        />
        {/* Active Fill/Glow with matching perfectly rounded shape */}
        <path
          d="M 50 8 Q 50 5 55 8 L 88 27 Q 95 31 95 38 L 95 77.47 Q 95 84.47 88 88.47 L 55 107.47 Q 50 110.47 45 107.47 L 12 88.47 Q 5 84.47 5 77.47 L 5 38 Q 5 31 12 27 Z"
          fill={isActive ? `${step.color}10` : "transparent"}
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-2 md:px-6">
        <span 
          className="text-[14px] md:text-[18px] font-black mb-[10px] md:mb-[22px] transition-colors duration-300"
          style={{ color: isActive ? step.color : "#d1d5db" }}
        >
          {step.number}
        </span>
        <h5 className={`text-[12px] md:text-[17px] font-bold leading-tight tracking-[0.03em] whitespace-pre-line ${isActive ? "text-black" : "text-gray-400 group-hover:text-gray-600"}`}>
          {step.title}
        </h5>
      </div>
    </div>
  </button>
);

export function HowWeDo() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="process" className="relative w-full bg-white py-0 overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white border-2 border-gray-200/60 rounded-[24px] p-6 md:p-12 min-h-auto md:min-h-[580px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-center py-10 md:py-12">
          <div className="text-center mb-16">
            <h3 className="text-[28px] font-medium text-[#15CEFF] tracking-tight">
              How we do!
            </h3>
          </div>

          <div className="flex flex-col items-center">
            {/* Hexagon Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 lg:gap-20 w-full justify-items-center mb-8 md:mb-12">
              {STEPS.map((step, idx) => (
                <HexagonStage 
                  key={step.number} 
                  step={step} 
                  isActive={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                />
              ))}
            </div>

            {/* Progress Line */}
            <div className="relative w-full max-w-[88%] h-12 flex items-center justify-between mb-0">
              <div className="absolute inset-0 flex items-center px-4">
                {/* Background Dashed Line */}
                <div className="w-full border-t-[0.5px] border-dashed border-orange-200 opacity-60" />
                {/* Dynamic Active Solid Line */}
                <div 
                  className="absolute top-1/2 left-4 h-[1.5px] bg-orange-400 transition-all duration-700 ease-in-out"
                  style={{ 
                    width: `calc(${(activeTab / (STEPS.length - 1)) * 100}% - 32px)`,
                    transform: 'translateY(-50%)' 
                  }}
                />
              </div>
              {STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`relative z-10 w-5 h-5 rounded-full border-2 transition-all duration-500 transform ${
                    activeTab === idx 
                      ? "bg-orange-400 border-white scale-125 shadow-[0_0_10px_rgba(251,146,60,0.5)]" 
                      : idx < activeTab 
                        ? "bg-orange-400 border-white scale-100" // Completed nodes
                        : "bg-white border-orange-300 scale-100" // Future nodes
                  }`}
                />
              ))}
            </div>

            {/* Detailed Content Section */}
            <div className="w-full text-center min-h-[200px] flex items-center justify-center mt-[5px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 max-w-[638px] mx-auto"
                >
                <h4 className="text-[18px] md:text-[20px] font-bold text-[#15CEFF]">
                  {STEPS[activeTab].subtitle}
                </h4>
                  <p className="text-black text-[16px] leading-relaxed mx-auto max-w-[638px]">
                    {STEPS[activeTab].detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
