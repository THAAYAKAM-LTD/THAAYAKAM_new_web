"use client";

import * as React from "react";
import { Button } from "./Button";
import { MessageCircle, Calendar } from "lucide-react";

export function ContactHero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-[#15CEFF] text-[28px] font-medium tracking-tight">
            Reach Out and Say Hello! 👋
          </h1>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          
          {/* Card 1: Consultation */}
          <div className="bg-white rounded-[20px] border-2 border-gray-100 p-8 md:p-10 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-cyan-100/50 transition-all duration-500 group">
            <h2 className="text-[#15CEFF] text-[20px] font-semibold flex items-center gap-2">
              Kickstart a Consultation 🌟
            </h2>
            <p className="text-[#000000] text-[16px] leading-[1.6] font-normal">
              Kickstart your ideas ✨ with the guidance of our experts 👩‍💼👨‍💼, as we collaborate to breathe life into your vision 🌱
            </p>
            <div className="mt-auto">
              <Button 
                className="w-[224px] h-[40px] rounded-xl text-[14px] font-bold bg-[#15CEFF] hover:bg-[#00acc1] flex items-center justify-center gap-2 p-0"
              >
                Schedule a consultation 📅
              </Button>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-[20px] border-2 border-gray-100 p-8 md:p-10 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-cyan-100/50 transition-all duration-500 group">
            <h2 className="text-[#15CEFF] text-[20px] font-semibold flex items-center gap-2">
              Message Us on WhatsApp 📱
            </h2>
            <p className="text-[#000000] text-[16px] leading-[1.6] font-normal">
              Reach out to us effortlessly through WhatsApp. 📲 Drop us a message and let's explore how we can help you succeed. 🚀
            </p>
            <div className="mt-auto">
              <Button 
                variant="button-ghost" 
                className="w-[224px] h-[40px] rounded-xl text-[14px] font-bold bg-[#15CEFF] border-0 text-white hover:bg-[#00acc1] transition-all flex items-center justify-center gap-2 p-0"
              >
                Reach via WhatsApp 💬
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
