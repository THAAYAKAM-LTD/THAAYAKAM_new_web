"use client";

import * as React from "react";
import { Button } from "./Button";

export function ContactForm() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col gap-6">
          <h2 className="text-[#15CEFF] text-[20px] font-semibold tracking-tight">
            Initiate Contact with Form 📇
          </h2>
          <p className="text-[#000000] text-[16px] font-normal whitespace-nowrap leading-relaxed">
            Initiate contact by filling out the form below 📇. We're excited to explore possibilities together 🚀.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-[800px] mx-auto p-4 md:p-0">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-black text-[14px] font-semibold flex items-center gap-0.5 ml-1">
                  Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full h-14 px-6 rounded-xl border border-gray-200 outline-none focus:border-[#15CEFF] focus:ring-1 focus:ring-[#15CEFF] transition-all text-black font-medium placeholder:text-gray-300 bg-gray-50/30"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-black text-[14px] font-semibold flex items-center gap-0.5 ml-1">
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-14 px-6 rounded-xl border border-gray-200 outline-none focus:border-[#15CEFF] focus:ring-1 focus:ring-[#15CEFF] transition-all text-black font-medium placeholder:text-gray-300 bg-gray-50/30"
                  required
                />
              </div>

              {/* Phone/WhatsApp */}
              <div className="flex flex-col gap-2">
                <label className="text-black text-[14px] font-semibold flex items-center gap-0.5 ml-1">
                  Phone/WhatsApp <span className="text-red-500 font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your phone or WhatsApp number" 
                  className="w-full h-14 px-6 rounded-xl border border-gray-200 outline-none focus:border-[#15CEFF] focus:ring-1 focus:ring-[#15CEFF] transition-all text-black font-medium placeholder:text-gray-300 bg-gray-50/30"
                  required
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-2">
                <label className="text-black text-[14px] font-semibold ml-1">
                  Organization (optional)
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your organization name" 
                  className="w-full h-14 px-6 rounded-xl border border-gray-200 outline-none focus:border-[#15CEFF] focus:ring-1 focus:ring-[#15CEFF] transition-all text-black font-medium placeholder:text-gray-300 bg-gray-50/30"
                />
              </div>

              {/* Describe your idea */}
              <div className="flex flex-col gap-2">
                <label className="text-black text-[14px] font-semibold flex items-center gap-0.5 ml-1">
                  Describe your idea <span className="text-red-500 font-bold">*</span>
                </label>
                <textarea 
                  placeholder="Tell us about your digital dream..." 
                  rows={6}
                  className="w-full p-6 rounded-xl border border-gray-200 outline-none focus:border-[#15CEFF] focus:ring-1 focus:ring-[#15CEFF] transition-all text-black font-medium placeholder:text-gray-300 bg-gray-50/30 resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button 
                type="submit"
                className="w-[143px] h-[40px] rounded-xl text-[14px] font-bold bg-[#15CEFF] hover:bg-[#00acc1] flex items-center justify-center gap-2 p-0"
              >
                Submit 📩
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
