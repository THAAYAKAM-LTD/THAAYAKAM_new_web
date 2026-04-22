"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "We Are", href: "/who-we-are" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <header className="flex w-full justify-center pt-8 px-4 relative z-[100]">
      <div className="flex w-full max-w-[1280px] items-center justify-between h-[68px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 relative z-50">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="THAAYAKAM Logo" 
            className="h-[40px] md:h-[56px] w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={`text-sm tracking-wider uppercase transition-colors ${
                link.name === "Home" 
                ? "text-brand-primary font-bold hover:opacity-80" 
                : "text-brand-dark font-semibold hover:text-brand-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Call to Action Button / Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button 
                className="w-auto rounded-full px-8 text-sm font-semibold tracking-wider bg-brand-primary hover:bg-[#0ea5e9]"
              >
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-brand-dark hover:text-brand-primary transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col h-full pt-28 px-10 gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-normal text-brand-dark hover:text-brand-primary transition-colors border-b border-gray-50 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button 
                className="w-full rounded-xl py-6 text-xl font-bold tracking-wider bg-brand-primary hover:bg-[#0ea5e9]"
              >
                Contact Us
              </Button>
            </Link>
          </div>
          
          {/* Close button inside drawer for redundant accessibility */}
          <button 
            className="absolute top-10 right-10 p-2 text-brand-dark"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>
        </div>
      )}
    </header>
  );
}
