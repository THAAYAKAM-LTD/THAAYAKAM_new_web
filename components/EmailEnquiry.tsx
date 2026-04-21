"use client";

import * as React from "react";
import { Button } from "./Button";
import { Mail } from "lucide-react";

export function EmailEnquiry() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#15CEFF] text-[20px] font-semibold tracking-tight">
            Send us an Email 📧
          </h2>
        </div>

        {/* Enquiry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          
          {/* General Enquiry */}
          <div className="bg-white rounded-[24px] border-2 border-gray-100 p-8 md:p-10 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-cyan-100/50 transition-all duration-500">
            <h3 className="text-[#00D084] text-[20px] font-semibold">
              General Enquiry
            </h3>
            <p className="text-[#000000] text-[16px] leading-[1.6] font-normal grow">
              Reach out to us directly via email ✉️. We're ready to engage in a productive conversation about your requirements 💼.
            </p>
            <div>
              <Button 
                className="w-[224px] h-[40px] rounded-[10px] text-[14px] font-bold bg-[#15CEFF] hover:bg-[#00acc1] p-0"
                onClick={() => window.location.href = "mailto:hello@thaayakam.co.uk"}
              >
                hello@thaayakam.co.uk
              </Button>
            </div>
          </div>

          {/* Careers Enquiry */}
          <div className="bg-white rounded-[24px] border-2 border-gray-100 p-8 md:p-10 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-cyan-100/50 transition-all duration-500">
            <h3 className="text-[#00D084] text-[20px] font-semibold">
              Careers Enquiry
            </h3>
            <p className="text-[#000000] text-[16px] leading-[1.6] font-normal grow">
              Engage with us through email to discuss potential career opportunities ✉️. Let's explore your future with us. 🌟
            </p>
            <div>
              <Button 
                className="w-[224px] h-[40px] rounded-[10px] text-[14px] font-bold bg-[#15CEFF] hover:bg-[#00acc1] p-0"
                onClick={() => window.location.href = "mailto:careers@thaayakam.co.uk"}
              >
                careers@thaayakam.co.uk
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
