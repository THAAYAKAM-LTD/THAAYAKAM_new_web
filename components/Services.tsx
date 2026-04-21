"use client";

import * as React from "react";
import { Cloud, Smartphone, Layout, Settings, Palette } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon, title, description, features }: ServiceCardProps) => (
  <div className="relative bg-white rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-5 h-full group hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
    {/* Title + Icon row */}
    <div className="flex items-start justify-between gap-4 z-20">
      <h4 className="text-[#15CEFF] font-bold text-[18px] leading-tight tracking-tight">
        {title}
      </h4>
      <div className="shrink-0 w-14 h-14 rounded-full bg-white border border-cyan-100 shadow-sm flex items-center justify-center text-[#15CEFF] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>

    {/* Description */}
    <p className="text-black text-[16px] leading-relaxed font-normal flex-1 z-20">
      {description}
    </p>

    {/* Feature list */}
    <ul className="space-y-2 mt-2 z-20">
      {features.map((f) => (
        <li key={f} className="text-[16px] font-semibold text-black flex items-center gap-2">
          {f}
        </li>
      ))}
    </ul>

    {/* Explore link - Bottom Right */}
    <div className="flex justify-end mt-4 z-20">
      <button className="text-[#00D084] text-[16px] font-medium hover:translate-x-1 transition-all flex items-center gap-1 group/btn">
        Explore
        <span className="group-hover/btn:opacity-100 opacity-0 transition-opacity">→</span>
      </button>
    </div>
  </div>
);

const SERVICES: ServiceCardProps[] = [
  {
    icon: <Cloud size={24} />,
    title: "Cloud Consultation",
    description:
      "Elevate your business to new heights by seamlessly migrating your digital ecosystem to the cloud. Our commitment lies in providing cutting-edge, high-performing, and meticulously secured solutions that optimise costs. Our adept engineers, certified across AWS, GCP, and Azure, work collaboratively to realise:",
    features: [
      "Cloud Architecture and Construction",
      "Effortless Data Transition",
      "Fortified Cloud Security",
    ],
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile Application",
    description:
      "Transform your business vision into a powerful mobile experience. We build native and cross-platform mobile apps using Flutter and React Native that delight users on iOS and Android, with seamless performance and scalable architecture designed for growth.",
    features: [
      "Cross-Platform iOS & Android",
      "Real-time & Offline Capability",
      "App Store Deployment & Support",
    ],
  },
  {
    icon: <Layout size={24} />,
    title: "Web App Development",
    description:
      "We craft fast, secure, and scalable web applications using modern frameworks such as Next.js, React, and Laravel. From dynamic portals to complex SaaS platforms, our full-stack engineers bring your product to life with pixel-perfect precision and solid backend architecture.",
    features: [
      "Full-Stack React & Next.js",
      "RESTful API & Microservices",
      "SEO-Optimised & Accessible",
    ],
  },
  {
    icon: <Settings size={24} />,
    title: "Managed IT",
    description:
      "Focus on growing your business while we manage your entire technology infrastructure. Our managed IT services cover proactive monitoring, security patching, incident response, and cloud cost optimisation — ensuring your systems run flawlessly around the clock.",
    features: [
      "24/7 Infrastructure Monitoring",
      "Cyber Security & Compliance",
      "DevOps & CI/CD Pipelines",
    ],
  },
  {
    icon: <Palette size={24} />,
    title: "Brand Design",
    description:
      "Your brand is your story. We craft cohesive visual identities and meticulous UI/UX designs that resonate with your audience, from logo and design system creation through to full product interface design — ensuring every touchpoint reflects who you are.",
    features: [
      "Logo & Brand Identity",
      "UI/UX Design & Prototyping",
      "Design System & Style Guides",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative w-full overflow-hidden bg-white py-24">
      {/* Subtle background dot grid - matches Hero section */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-10">
          <h2 className="text-[#15CEFF] text-[28px] font-medium tracking-tight">
            What We Do!
          </h2>
          <p className="text-black text-[20px] max-w-[808px] leading-relaxed font-medium">
            We deliver 🙌 creatively led and strategically driven innovative solutions 💡 tied
            with robust trust and intelligence to deploy your dream to a new era!
          </p>
        </div>

        {/* Cards — 2 + 2 + 1 centred */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-12">
            {SERVICES.slice(0, 2).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-12">
            {SERVICES.slice(2, 4).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          {/* Row 3 — centred single card */}
          <div className="flex justify-center">
            <div className="w-full md:w-[calc(50%-1.5rem)]">
              <ServiceCard {...SERVICES[4]} />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button className="px-10 py-3.5 rounded-full bg-brand-primary text-white font-bold text-base hover:bg-[#00acc1] transition-colors shadow-lg">
            Schedule a consultation 📅
          </button>
        </div>

      </div>
    </section>
  );
}
