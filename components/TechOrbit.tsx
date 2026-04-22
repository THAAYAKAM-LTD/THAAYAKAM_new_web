"use client";

import React from "react";
import { 
  SiReact, SiPython, SiDocker, SiAmazonwebservices, SiNextdotjs, SiFigma,
  SiLaravel, SiMicrosoftazure, SiMicrosoftsqlserver, SiSquarespace,
  SiFlutter, SiDotnet, SiShopify, SiWebflow 
} from "react-icons/si";

const INNER_RADIUS = 30; // %
const OUTER_RADIUS = 44; // %

const INNER_TECH = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiPython, label: "Python", color: "#3776AB" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
  { Icon: SiAmazonwebservices, label: "AWS", color: "#FF9900" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#000000" },
  { Icon: SiFigma, label: "Figma", color: "#F24E1E" },
];

const OUTER_TECH = [
  { Icon: SiLaravel, label: "Laravel", color: "#FF2D20" },
  { Icon: SiMicrosoftazure, label: "Azure", color: "#0089D6" },
  { Icon: SiMicrosoftsqlserver, label: "SQL Server", color: "#CC2927" },
  { Icon: SiSquarespace, label: "Squarespace", color: "#000000" },
  { Icon: SiFlutter, label: "Flutter", color: "#02569B" },
  { Icon: SiDotnet, label: ".NET", color: "#512BD4" },
  { Icon: SiShopify, label: "Shopify", color: "#7AB55C" },
  { Icon: SiWebflow, label: "Webflow", color: "#4353FF" },
];

export default function TechOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f7ff] to-white p-4 sm:p-8 rounded-3xl shadow-xl border border-white/50">
      
      {/* CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes dash-move {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
        }
        @keyframes pulse-line {
          0% { opacity: 0.1; stroke-dashoffset: 200; }
          50% { opacity: 0.5; }
          100% { opacity: 0.1; stroke-dashoffset: 0; }
        }
        @keyframes hex-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(96, 200, 255, 0.3); }
          50% { box-shadow: 0 0 0 20px rgba(96, 200, 255, 0); }
        }

        .orbit-inner-ring {
          animation: spin-clockwise 30s linear infinite;
        }
        .orbit-outer-ring {
          animation: spin-counter 40s linear infinite;
        }
        .logo-container-inner {
          animation: spin-counter 30s linear infinite;
        }
        .logo-container-outer {
          animation: spin-clockwise 40s linear infinite;
        }
        .orbit-dashed {
          animation: dash-move 4s linear infinite;
        }
        .pulse-line-anim {
          animation: pulse-line 4s linear infinite;
        }
        .center-hex-anim {
          animation: hex-pulse 3s ease-in-out infinite;
        }
        .logo-bubble {
          transition: all 0.3s ease;
        }
        .logo-bubble:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(96, 200, 255, 0.6);
          z-index: 50;
        }
        .orbit-container:hover .orbit-inner-ring,
        .orbit-container:hover .orbit-outer-ring,
        .orbit-container:hover .logo-container-inner,
        .orbit-container:hover .logo-container-outer {
          animation-play-state: paused;
        }
      `}} />

      <div className="orbit-container relative w-full h-full flex items-center justify-center">
        
        {/* Background Rings - Dashed SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r={INNER_RADIUS} 
            fill="none" stroke="#60c8ff" strokeWidth="0.2" strokeOpacity="0.3"
            strokeDasharray="1.5 1.5" className="orbit-dashed"
          />
          <circle 
            cx="50" cy="50" r={OUTER_RADIUS} 
            fill="none" stroke="#60c8ff" strokeWidth="0.2" strokeOpacity="0.3"
            strokeDasharray="1.5 1.5" className="orbit-dashed"
          />
        </svg>

        {/* Central Hexagon */}
        <div className="center-hex-anim relative z-20 w-[20%] aspect-square bg-white border border-[#60c8ff]/30 shadow-xl flex items-center justify-center" 
             style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}>
          <div className="p-3 w-full h-full flex flex-col gap-1.5 opacity-60">
             <div className="flex gap-1 justify-center mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
             </div>
             <div className="h-1.5 w-full bg-slate-100 rounded" />
             <div className="h-1.5 w-2/3 bg-slate-50 rounded" />
             <div className="mt-auto h-4 w-full bg-[#60c8ff]/10 rounded-sm" />
          </div>
        </div>

        {/* Inner Ring */}
        <div className="orbit-inner-ring absolute inset-0">
          {INNER_TECH.map((tech, i) => {
            const total = INNER_TECH.length;
            const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + INNER_RADIUS * Math.cos(angle);
            const y = 50 + INNER_RADIUS * Math.sin(angle);
            
            return (
              <div key={tech.label} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                {/* Connecting Line */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible" width="200" height="200" viewBox="0 0 100 100">
                  <line 
                    x1="0" y1="0" x2={-(x-50)*2} y2={-(y-50)*2} 
                    stroke="#60c8ff" strokeWidth="0.3" strokeDasharray="4 4"
                    className="pulse-line-anim" style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </svg>
                {/* Logo Bubble */}
                <div className="logo-container-inner">
                  <div className="logo-bubble w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 cursor-pointer group">
                    <tech.Icon className="text-xl sm:text-2xl" style={{ color: tech.color }} />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Ring */}
        <div className="orbit-outer-ring absolute inset-0">
          {OUTER_TECH.map((tech, i) => {
            const total = OUTER_TECH.length;
            const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + OUTER_RADIUS * Math.cos(angle);
            const y = 50 + OUTER_RADIUS * Math.sin(angle);
            
            return (
              <div key={tech.label} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                {/* Connecting Line */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible" width="200" height="200" viewBox="0 0 100 100">
                  <line 
                  x1="0" y1="0" x2={-(x-50)*2} y2={-(y-50)*2} 
                  stroke="#60c8ff" strokeWidth="0.3" strokeDasharray="4 4"
                  className="pulse-line-anim" style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </svg>
                {/* Logo Bubble */}
                <div className="logo-container-outer">
                  <div className="logo-bubble w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 cursor-pointer group">
                    <tech.Icon className="text-xl sm:text-2xl" style={{ color: tech.color }} />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
