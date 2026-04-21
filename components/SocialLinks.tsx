"use client";

import * as React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: <FaFacebookF size={20} />, label: "Facebook", href: "#" },
  { icon: <FaTwitter size={20} />, label: "Twitter", href: "#" },
  { icon: <FaInstagram size={22} />, label: "Instagram", href: "#" },
  { icon: <SiThreads size={22} />, label: "Threads", href: "#" },
  { icon: <FaLinkedinIn size={20} />, label: "LinkedIn", href: "#" },
];

export function SocialLinks() {
  return (
    <div className="w-full py-8 bg-white flex justify-center items-center gap-6">
      {SOCIAL_LINKS.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-label={link.label}
          className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg hover:shadow-cyan-400/30 hover:scale-115 active:scale-95 transition-all duration-300 group"
        >
          <div className="group-hover:scale-110 transition-transform">
            {link.icon}
          </div>
        </a>
      ))}
    </div>
  );
}
