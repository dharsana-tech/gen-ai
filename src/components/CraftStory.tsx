import React from 'react';
import { ASSETS } from '../data/cafeData';

export const CraftStory: React.FC = () => {
  return (
    <section id="craft" className="py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Kicker */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-3">
            <span>Philosophy &amp; Provenance</span>
            <span aria-hidden="true">·</span>
            <span>The Slow Method</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1714] tracking-tight leading-tight">
            From High-Altitude Terraces to Ceramic Cups
          </h2>
          <p className="mt-4 text-[#5A473E] text-base sm:text-lg leading-relaxed font-light">
            We believe that coffee and bread share an identical soul: both are living organisms shaped by wild microbiology, soil terroir, patient heat, and sensory intuition.
          </p>
        </div>

        {/* Visual & Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual Staggered Framing */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-[#EFE9E0] overflow-hidden border border-[#E0D7C9]">
                <img
                  src={ASSETS.roasteryBeans}
                  alt="Freshly roasted single-origin Arabica beans in cooling tray"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-xs text-[#827267] leading-relaxed">
                Small-batch drum roasting on our restored 1968 Probat in the main courtyard roastery.
              </p>
            </div>

            <div className="space-y-4 sm:pt-10">
              <div className="aspect-[4/3] bg-[#EFE9E0] overflow-hidden border border-[#E0D7C9]">
                <img
                  src={ASSETS.pouroverChemex}
                  alt="Single-origin hand brew Chemex ritual with brass kettle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-xs text-[#827267] leading-relaxed">
                Gravity-fed extraction with unbleached bonded filters, dialed for luminous clarity.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Pillars with Editorial Numbering */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-xs font-serif italic text-[#C27D4C] block mb-1">
                Chapter 01
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#1E1714] mb-2">
                Direct Relationship Sourcing
              </h3>
              <p className="text-sm text-[#5A473E] leading-relaxed font-light">
                We contract exclusively with independent smallholder farmers in Yirgacheffe, Huila, and Antigua. We visit during harvest and pay an average of 42% above fair trade benchmarks directly into grower cooperatives.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E2D9]">
              <span className="text-xs font-serif italic text-[#C27D4C] block mb-1">
                Chapter 02
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#1E1714] mb-2">
                The 48-Hour Cold Lamination
              </h3>
              <p className="text-sm text-[#5A473E] leading-relaxed font-light">
                Our viennoiserie requires two complete calendar days. Slow fermentation develops deep lactic tang, wrapped with AOP butter from Charentes-Poitou for 27 whisper-thin honeycomb layers.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E2D9]">
              <span className="text-xs font-serif italic text-[#C27D4C] block mb-1">
                Chapter 03
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#1E1714] mb-2">
                Conscious Zero-Waste Cycle
              </h3>
              <p className="text-sm text-[#5A473E] leading-relaxed font-light">
                All spent espresso grounds are collected daily by urban Parisian mushroom cultivators. All takeout vessels and packaging are 100% home-compostable unbleached plant fiber.
              </p>
            </div>
          </div>

        </div>

        {/* Head Roaster Editorial Quote Block */}
        <div className="bg-[#FAF2EB] border-l-2 border-[#C27D4C] p-8 sm:p-12 max-w-4xl mx-auto">
          <blockquote className="font-serif text-xl sm:text-2xl italic text-[#1E1714] leading-relaxed mb-6">
            “Specialty coffee shouldn’t feel intimidating or clinical. It should feel like quiet morning warmth—the smell of toasted butter, steam rising against aged stone walls, and a cup that stops time for fifteen minutes.”
          </blockquote>
          <div className="flex items-center space-x-3 text-xs tracking-wider uppercase text-[#827267] font-medium">
            <span className="text-[#1E1714] font-semibold">Antoine Delacroix</span>
            <span aria-hidden="true">·</span>
            <span>Head Roaster &amp; Co-Founder</span>
            <span aria-hidden="true">·</span>
            <span>Maison Moka Paris</span>
          </div>
        </div>

      </div>
    </section>
  );
};
