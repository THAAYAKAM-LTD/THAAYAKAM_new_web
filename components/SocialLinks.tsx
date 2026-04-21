"use client";

import * as React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: <FaFacebookF />, label: "Facebook", href: "#" },
  { icon: <FaTwitter />, label: "Twitter", href: "#" },
  { icon: <FaInstagram />, label: "Instagram", href: "#" },
  { icon: <SiThreads />, label: "Threads", href: "#" },
  { icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
];

export function SocialLinks() {
  return (
    <div className="w-full py-4 md:py-6 bg-white flex justify-center items-center gap-3 md:gap-4">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .float-anim {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}} />
      {SOCIAL_LINKS.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-label={link.label}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full float-anim bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="text-[18px] md:text-[25px] group-hover:scale-110 transition-transform flex items-center justify-center">
            {link.icon}
          </div>
        </a>
      ))}
    </div>
  );
}
