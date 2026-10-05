import React from 'react';
import { PRESS_QUOTES } from '../data/cafeData';
import { Quote } from 'lucide-react';

export const PressReviews: React.FC = () => {
  return (
    <section id="press" className="py-24 bg-[#FAF2EB] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-3">
            <Quote className="w-3.5 h-3.5 text-[#C27D4C]" />
            <span>Critical Acclaim &amp; Editorial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1714] tracking-tight leading-tight">
            Words from the Press &amp; Coffee Guild
          </h2>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRESS_QUOTES.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 border border-[#E0D7C9] flex flex-col justify-between shadow-sm hover:border-[#C27D4C]/60 transition-colors"
            >
              <blockquote className="font-serif text-lg sm:text-xl italic text-[#1E1714] leading-relaxed mb-8">
                “{item.quote}”
              </blockquote>

              <div className="pt-6 border-t border-[#F0ECE4]">
                <div className="font-serif text-base font-medium text-[#1E1714]">
                  {item.author}
                </div>
                <div className="text-xs text-[#827267] mt-0.5">
                  <span className="font-medium text-[#C27D4C]">{item.publication}</span>
                  <span className="mx-1.5 text-[#D0C5B8]">·</span>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
