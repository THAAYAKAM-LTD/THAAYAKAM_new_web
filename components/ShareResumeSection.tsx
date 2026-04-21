"use client";

import React from "react";

export function ShareResumeSection() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm text-center">
          <div className="max-w-[850px] mx-auto mb-10">
            <p className="text-[#000000] text-[16px] font-semibold leading-[1.8] tracking-[0.07em]">
              We are eagerly poised to expand our teams, driving towards profound impact. <br />
              Kindly share your resume with us while indicating the preferred job title as <br />
              <span className="font-bold underline underline-offset-4">'Career - [Your Preferred Job Title]'</span>. <br />
              We are committed to guiding your journey to new heights.
            </p>
          </div>

          <a 
            href="mailto:careers@thaayakam.co.uk" 
            className="inline-flex items-center justify-center w-[179px] h-[40px] bg-[#15CEFF] text-white font-bold text-[14px] rounded-[10px] 
            hover:bg-[#0ea5e9] transition-all shadow-md hover:shadow-cyan-100 gap-2"
          >
            Share Resume 📄
          </a>
        </div>
      </div>
    </section>
  );
}
