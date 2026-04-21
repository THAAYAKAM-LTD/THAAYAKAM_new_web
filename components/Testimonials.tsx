"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  image: string;
}

const TestimonialCard = ({
  name,
  role,
  company,
  industry,
  quote,
  image,
}: TestimonialCardProps) => (
  <div className="bg-white rounded-[20px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-8 h-full group hover:shadow-cyan-100 transition-all duration-500">
    {/* Glowing Pill Header */}
    <div className="inline-flex items-center bg-white rounded-full shadow-[0_0_15px_rgba(21,206,255,0.25)] border border-cyan-100/50 self-start group pr-10 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(21,206,255,0.4)]">
      <div className="w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 z-10 transition-transform duration-500 group-hover:scale-105">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
      </div>
      <div className="flex flex-col pl-4 py-2">
        <p className="font-semibold text-black text-[14px] tracking-[0.05em] leading-tight">{name}</p>
        <p className="font-semibold italic text-gray-400 text-[12px] tracking-[0.05em] leading-tight">{role}</p>
        <p className="font-semibold italic text-gray-400 text-[12px] tracking-[0.05em] leading-tight">{company}</p>
      </div>
    </div>

    {/* Quote */}
    <blockquote className="text-black text-[14px] tracking-[0.07em] leading-relaxed flex-1 relative">
      <span className="absolute -left-2 -top-2 text-cyan-200 text-4xl opacity-50 font-serif">"</span>
      {quote}
      <span className="absolute -bottom-6 right-0 text-cyan-200 text-4xl opacity-50 font-serif">"</span>
    </blockquote>

    {/* Industry tag */}
    <div className="inline-flex mt-2">
      <span className="text-[12px] font-semibold tracking-[0.07em] text-[#00D084]">
        {industry}
      </span>
    </div>
  </div>
);

const TESTIMONIALS: TestimonialCardProps[] = [
  {
    name: "Mrs Suvarka Pratheepan",
    role: "Co-founder & CMO",
    company: "PromoZon Technologies Ltd",
    industry: "Retail & Consumer Services",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    quote:
      `Our success story was meticulously crafted by UI/UX design expertise and Mobile Apps Development prowess. Seamlessly integrated with AWS Cloud Solution, it's now a geo-location-powered deal discovery powerhouse. Kudos for transforming our vision into reality.`,
  },
  {
    name: "Mr Amarnath Mahadeva",
    role: "Chairman",
    company: "British Tamils Cricket League",
    industry: "Sports & Entertainment",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    quote:
      `Your team's exceptional work in revamping our Cricket League's website and creating a high-performing backend with portals truly impressed us. From seamless UI/UX design to full-stack excellence, your responsiveness and skill are very good. Thanks for bringing our vision to life!`,
  },
  {
    name: "Mr Mir Kausar Ali",
    role: "Founder",
    company: "World Migratio Ltd",
    industry: "Education & Consulting",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    quote:
      `Our Student Migration Consulting platform has been transformed into a fine experience, all thanks to your team's backend development prowess. The quality and efficiency you've showcased in building the backend has significantly enhanced the platform's functionality. Thank you for your exceptional backend development!`,
  },
  {
    name: "Mr Sanjy Kanagarasa",
    role: "Founder",
    company: "Yathumure Event Management Services",
    industry: "Events & Hospitality",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    quote:
      `Your team's exceptional work in revamping our platform's website and creating a high-performing backend with portals truly impressed us. From seamless UI/UX design to full-stack excellence, your responsiveness and skill are very good. Thanks for bringing our vision to life!`,
  },
];

export function Testimonials() {
  return (
    <section id="clients" className="w-full bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-14">
          <h2 className="text-[#15CEFF] text-[28px] font-bold text-center mb-3 tracking-tight">
            Our Clients Speak
          </h2>
          <div className="w-[60px] h-0.5 bg-[#15CEFF]" />
        </div>

        {/* 2×2 grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button className="flex items-center gap-2 px-10 py-4 rounded-[10px] bg-[#15CEFF] text-white font-bold text-lg hover:bg-[#00b4d8] transition-all shadow-lg hover:shadow-cyan-200">
            Portfolio 💼
          </button>
        </div>

      </div>
    </section>
  );
}
