"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

const SOCIAL_LINKS = [
  { icon: <FaLinkedin size={18} />, href: "#", name: "LinkedIn" },
  { icon: <FaXTwitter size={18} />, href: "#", name: "X (Twitter)" },
  { icon: <FaInstagram size={18} />, href: "#", name: "Instagram" }
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="group flex items-center gap-2 text-gray-600 hover:text-cyan-500 transition-all duration-300 hover:translate-x-1"
  >
    <span className="text-[15px] font-medium">{children}</span>
    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-500 font-bold">
      →
    </span>
  </Link>
);

const LogoSection = () => {
  return (
    <Link href="/" className="inline-block group">
      <img 
        src="/footerLogo.svg" 
        alt="THAAYAKAM Logo" 
        className="w-[80px] h-[80px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F5F5F5] border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* TOP GRID - Forced Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-6 lg:border-r lg:border-gray-200 lg:pr-10">
            <LogoSection />
            <div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                THAAYAKAM <span className="text-cyan-500">LTD</span>
              </h3>
              <p className="text-gray-600 text-[12px] leading-relaxed max-w-[322px] mt-4 font-medium">
                THAAYAKAM LTD is a start-up, founded in 2021 with the sole intention to provide a wide range of High-tech solutions incorporated with emerging technologies.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-bold text-sm uppercase tracking-[0.2em]">Company</h4>
              <div className="w-6 h-0.5 bg-cyan-500"></div>
            </div>
            <nav className="flex flex-col gap-3">
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/who-we-are">We Are</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Quote?</FooterLink>
            </nav>
          </div>

          {/* Col 3: Our Platforms */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-bold text-sm uppercase tracking-[0.2em]">Our Platforms</h4>
              <div className="w-6 h-0.5 bg-cyan-500"></div>
            </div>
            <nav className="flex flex-col gap-3">
              <FooterLink href="#">Clutch</FooterLink>
              <FooterLink href="#">Dribbble</FooterLink>
              <FooterLink href="#">Behance</FooterLink>
            </nav>
          </div>

          {/* Col 4: Follow */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-bold text-sm uppercase tracking-[0.2em]">Follow</h4>
              <div className="w-6 h-0.5 bg-cyan-500"></div>
            </div>
            <nav className="flex flex-col gap-3">
              <FooterLink href="#">LinkedIn</FooterLink>
              <FooterLink href="#">X (Twitter)</FooterLink>
              <FooterLink href="#">Instagram</FooterLink>
            </nav>
          </div>

          {/* Col 5: Contact */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-black font-bold text-sm uppercase tracking-[0.2em]">Contact</h4>
              <div className="w-6 h-0.5 bg-cyan-500"></div>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="mailto:hello@thaayakam.co.uk" className="group flex items-center gap-3 text-gray-600 hover:text-cyan-500 transition-colors text-[15px] font-medium">
                <Mail size={16} className="text-cyan-500" />
                <span className="truncate">hello@thaayakam.co.uk</span>
              </Link>
              <Link href="mailto:careers@thaayakam.co.uk" className="group flex items-center gap-3 text-gray-600 hover:text-cyan-500 transition-colors text-[15px] font-medium">
                <Mail size={16} className="text-cyan-500" />
                <span className="truncate">careers@thaayakam.co.uk</span>
              </Link>
              <div className="flex items-center gap-3 text-gray-600 text-[15px] font-medium">
                <Phone size={16} className="text-cyan-500" />
                <span>(+44) 7443 55 7732</span>
              </div>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-12 h-px bg-gray-200" />

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs font-bold">
            © {currentYear} THAAYAKAM LTD. All rights reserved.
          </p>

          {/* Color Dots */}
          <div className="flex gap-2.5 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-black transition-colors text-xs font-bold">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-black transition-colors text-xs font-bold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
