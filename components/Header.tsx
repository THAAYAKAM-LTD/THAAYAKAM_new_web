import * as React from "react";
import Link from "next/link";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="flex w-full justify-center pt-8 px-4 relative z-50">
      <div className="flex w-full max-w-[1280px] items-center justify-between h-[68px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="THAAYAKAM Logo" 
            className="h-[56px] w-[244px] object-contain"
          />
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-brand-primary font-bold text-sm tracking-wider uppercase hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link 
            href="/portfolio" 
            className="text-brand-dark font-semibold text-sm tracking-wider uppercase hover:text-brand-primary transition-colors"
          >
            Portfolio
          </Link>
          <Link 
            href="/services" 
            className="text-brand-dark font-semibold text-sm tracking-wider uppercase hover:text-brand-primary transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/who-we-are" 
            className="text-brand-dark font-semibold text-sm tracking-wider uppercase hover:text-brand-primary transition-colors"
          >
            We Are
          </Link>
          <Link 
            href="/careers" 
            className="text-brand-dark font-semibold text-sm tracking-wider uppercase hover:text-brand-primary transition-colors"
          >
            Careers
          </Link>

        </nav>
        
        {/* Call to Action Button */}
        <div>
          <Link href="/contact">
            <Button 
              className="w-auto rounded-full px-8 text-sm font-semibold tracking-wider bg-brand-primary hover:bg-[#0ea5e9]"
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
