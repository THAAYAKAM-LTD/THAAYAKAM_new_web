"use client";

import * as React from "react";
import Link from "next/link";
import { Cloud, Smartphone, Code2, Paintbrush } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon, title, description, features }: ServiceCardProps) => (
  <div className="relative bg-white rounded-[32px] border border-gray-100 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col gap-6 h-full group hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
    {/* Title + Icon row */}
    <div className="flex items-start justify-between gap-4 z-20">
      <h4 className="text-[#15CEFF] font-bold text-[22px] leading-tight tracking-tight">
        {title}
      </h4>
      <div className="shrink-0 w-16 h-16 rounded-full bg-white border border-cyan-50 border-opacity-50 shadow-sm flex items-center justify-center text-[#15CEFF] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>

    {/* Description */}
    <p className="text-black text-[15px] md:text-[16px] leading-[1.6] font-normal flex-1 z-20 opacity-90">
      {description}
    </p>

    {/* Feature list */}
    <ul className="space-y-3 mt-2 z-20">
      {features.map((f) => (
        <li key={f} className="text-[17px] font-bold text-black flex items-center gap-2">
          {f}
        </li>
      ))}
    </ul>

    {/* Explore link - Bottom Right */}
    <div className="flex justify-end mt-6 z-20">
      <button className="text-[#00D084] text-[17px] font-semibold hover:translate-x-1 transition-all flex items-center gap-1 group/btn">
        Explore
        <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-1">→</span>
      </button>
    </div>
  </div>
);

const SERVICES: ServiceCardProps[] = [
  {
    icon: <Cloud size={30} strokeWidth={1.5} />,
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
    icon: <Smartphone size={30} strokeWidth={1.5} />,
    title: "Mobile App Development",
    description:
      "Empower your business with the magic of mobile. Seamlessly connect with your audience and showcase your offerings at their fingertips. Our dedicated mobile app development service empowers you to share your vision with the world. Our seasoned team harnesses cutting-edge technologies to guide you across:",
    features: [
      "Android App Prowess", 
      "iOS App Excellence", 
      "Ongoing Maintenance"
    ],
  },
  {
    icon: <Code2 size={30} strokeWidth={1.5} />,
    title: "Web App Development",
    description:
      "Elevate your brand's online presence with captivating web applications that exhibit your offerings to the world. Our expert web app development service equips you with adaptive solutions, merging form and function through an array of innovative tools. Our skilled team guides you through:",
    features: [
      "Full-Stack Expertise", 
      "Tailored API Solutions", 
      "Ongoing Maintenance"
    ],
  },
  {
    icon: <Paintbrush size={30} strokeWidth={1.5} />,
    title: "Brand Design",
    description:
      "Amidst the dynamic competitive landscape, let your brand shine with unparalleled identity and impactful customer engagement. Our dedicated team commits to infusing creativity and passion into every aspect of your brand's journey, including:",
    features: [
      "Identity Design Excellence", 
      "Seamless UI/UX Innovation", 
      "Striking Product Design"
    ],
  },
];

export function Services() {
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
            What we do! ⚙️
          </h2>
          <p className="text-[#000000] text-[20px] max-w-[789px] leading-[1.4] font-semibold">
            Our team 😎 with extensive knowledge and innovative thoughts is here 
            to deliver top-performing innovative solutions tied with 
            robust, trust and intelligence to deploy your performance into a new era!
          </p>
        </div>

        {/* Cards — 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
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
