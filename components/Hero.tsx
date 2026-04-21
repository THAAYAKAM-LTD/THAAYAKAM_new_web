"use client";

import * as React from "react";

const TYPEWRITER_TERMS = [
  "Mobile Apps.",
  "Web Apps.",
  "SaaS Products.",
  "Digital Products.",
];

interface OrbitIcon {
  src: string;
  label: string;
  top: string; // % within the 584×584 canvas
  left: string;
  size: number; // rendered icon inner size px
  cardSize: number; // outer white circle size px
}

/**
 * Icon positions derived directly from the Figma landing-image-new-desktop frame
 * (584×584 starting at x=672, y=124). Percentages are the icon centres.
 */
const ORBIT_ICONS: OrbitIcon[] = [
  { src: "/icon/pthon_logo.svg", label: "Python", top: "12.5%", left: "33%", size: 60, cardSize: 72 },
  { src: "/icon/nextjs-logo.svg", label: "Next.js", top: "14.4%", left: "51.5%", size: 50, cardSize: 60 },
  { src: "/icon/laravel_logo.svg", label: "Laravel", top: "10.3%", left: "66.8%", size: 50, cardSize: 60 },
  { src: "/icon/react_logo.svg", label: "React", top: "20.2%", left: "17.6%", size: 50, cardSize: 60 },
  { src: "/icon/azure_logo.svg", label: "Azure", top: "23.5%", left: "71.4%", size: 50, cardSize: 60 },
  { src: "/icon/ms-sql_logo.svg", label: "SQL Server", top: "31.2%", left: "87.2%", size: 64, cardSize: 84 },
  { src: "/icon/drupal_logo.svg", label: "Drupal", top: "33.2%", left: "19.3%", size: 50, cardSize: 60 },
  { src: "/icon/squarespace_logo.svg", label: "Squarespace", top: "45.7%", left: "83.7%", size: 50, cardSize: 60 },
  { src: "/icon/docker_logo.svg", label: "Docker", top: "50.3%", left: "15.9%", size: 50, cardSize: 60 },
  { src: "/icon/Group 645.svg", label: "Terraform", top: "41.3%", left: "8.4%", size: 50, cardSize: 60 },
  { src: "/icon/figma_logo.svg", label: "Figma", top: "55.7%", left: "92.1%", size: 50, cardSize: 64 },
  { src: "/icon/flutter_logo.svg", label: "Flutter", top: "64.2%", left: "81.3%", size: 50, cardSize: 60 },
  { src: "/icon/aws_logo.svg", label: "AWS", top: "67.5%", left: "12.7%", size: 60, cardSize: 84 },
  { src: "/icon/web_flow_logo.svg", label: "Webflow", top: "76.4%", left: "28.3%", size: 50, cardSize: 60 },
  { src: "/icon/asp_net_logo.svg", label: ".NET", top: "79.5%", left: "78.9%", size: 60, cardSize: 84 },
];

export function Hero() {
  const [termIndex, setTermIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const term = TYPEWRITER_TERMS[termIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < term.length) {
            setDisplayText(term.substring(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else if (displayText.length > 0) {
          setDisplayText(term.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTermIndex((prev) => (prev + 1) % TYPEWRITER_TERMS.length);
        }
      },
      isDeleting ? 40 : 90
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, termIndex]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white min-h-[calc(100vh-116px)] flex flex-col justify-center"
    >
      {/* Subtle background dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_584px] gap-10 lg:gap-16 items-center">

        {/* ---------- Left column ---------- */}
        <div className="flex flex-col items-start gap-8 pt-6 lg:pt-12">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-brand-primary leading-[0.92] uppercase tracking-tight">
            INNOVATE. <br />
            EMBRACE. <br />
            INSPIRE.
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-lg lg:text-xl font-medium leading-relaxed max-w-[540px]">
            To make your footprints glow into the digital era,
            <br />
            We assist <span className="text-orange-500">🧡</span> you to gear-up yourself through,
          </p>

          {/* Typewriter */}
          <div className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-[34px] font-bold text-brand-accent">
            <span>🚀 Ignite your</span>
            <span className="relative inline-flex items-center min-w-[200px]">
              {displayText}
              <span className="inline-block w-[3px] h-8 bg-brand-accent ml-1 animate-pulse" />
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="h-14 min-w-[240px] px-8 rounded-full bg-brand-primary hover:bg-[#00acc1] text-white text-base font-bold shadow-xl transition-all">
              Schedule a consultation 📅
            </button>
            <button className="h-14 min-w-[150px] px-8 rounded-full border-2 border-brand-primary/40 text-brand-primary hover:bg-brand-primary/5 text-base font-bold transition-all">
              Explore us 😎
            </button>
          </div>


        </div>

        {/* ---------- Right column — landing image 584x584 ---------- */}
        <div className="relative w-full max-w-[584px] mx-auto aspect-square select-none">
          {/* Soft outer glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full pointer-events-none z-0"
            style={{ background: "rgba(21, 206, 255, 0.08)", filter: "blur(120px)" }}
          />

          {/* Master circular backdrop — White base with blue stroke encompassing the orbit */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square rounded-full bg-white shadow-[0_0_120px_rgba(21,206,255,0.12)] z-0"
            aria-hidden="true"
          />

          {/* Crossing guidelines removed */}

          {/* Two prominent dashed orbit rings — restored as requested */}
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Outer orbit ring (Snap for Python, Laravel, SQL Server, etc.) */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#15CEFF"
              strokeOpacity="0.8"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner orbit ring (Snap for Next.js, Azure, Docker, etc.) */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#15CEFF"
              strokeOpacity="0.7"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Hexagonal backdrop — SVG for stroke support and rounded corners */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[53%] aspect-square flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.07)]"
              aria-hidden="true"
            >
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
                stroke="#E2E8F0"
                strokeWidth="2.5"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Central mockup image centred inside the hexagon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[40%] aspect-[254/162] flex items-center justify-center">
            <img
              src="/icon/center.svg"
              alt="THAAYAKAM product mockup"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Floating tech icons */}
          {ORBIT_ICONS.map((icon) => (
            <div
              key={icon.label}
              title={icon.label}
              className="absolute z-30"
              style={{
                top: icon.top,
                left: icon.left,
                width: `${icon.cardSize}px`,
                height: `${icon.cardSize}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
                <img
                  src={icon.src}
                  alt={icon.label}
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all"
                />
              </div>
            </div>
          ))}

          {/* Shopify Partners badge — bottom centre, precisely aligned with outer ring */}
          <div className="absolute z-40" style={{ left: "50%", top: "89%", transform: "translate(-50%, -50%)" }}>
            <div 
              className="hover:scale-105 transition-transform cursor-pointer flex items-center justify-center p-0"
              style={{ width: "232px", height: "55px" }}
            >
              <img
                src="/icon/shopify_partners_logo.svg"
                alt="Shopify Partners"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
