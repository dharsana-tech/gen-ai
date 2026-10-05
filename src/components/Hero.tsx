import React from 'react';
import { ASSETS } from '../data/cafeData';
import { Compass, Sparkles, ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#1E1714]">
      {/* Background Image with Fallback Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.heroAmbiance}
          alt="Sunlit interior of Maison Moka cafe and roastery with natural oak and travertine bar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140F0D]/90 via-[#1C1613]/60 to-[#140F0D]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        
        {/* Unboxed Metadata Kicker */}
        <div className="inline-flex items-center space-x-2 text-xs sm:text-sm tracking-widest uppercase text-[#EAD8C7] mb-6 font-medium">
          <span>Est. 2018</span>
          <span aria-hidden="true" className="text-[#C27D4C]">·</span>
          <span>Single-Origin Roastery</span>
          <span aria-hidden="true" className="text-[#C27D4C]">·</span>
          <span>Viennoiserie Artisanale</span>
        </div>

        {/* Display Headline */}
        <h1 
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-[#FAF8F5] mb-6 max-w-4xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          The Art of Slow Mornings &amp; Single-Origin Terroir
        </h1>

        {/* Lead Paragraph */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#E3DBD2] font-light leading-relaxed mb-10">
          Hand-poured micro-lots roasted over flame in our historic courtyard, paired with 48-hour laminated sourdough pastries pulled fresh from stone hearths at dawn.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#C27D4C] hover:bg-[#D48D5C] text-white transition-all transform hover:-translate-y-0.5 shadow-lg shadow-black/30 flex items-center justify-center space-x-2"
          >
            <span>Explore Autumn Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-transparent hover:bg-white/10 text-[#FAF8F5] border border-[#E8E2D9]/40 hover:border-white transition-all flex items-center justify-center space-x-2"
          >
            <span>Reserve Table &amp; Courtyard</span>
          </button>
        </div>

        {/* Atmospheric Live Status Ribbon */}
        <div className="pt-8 border-t border-white/15 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 text-xs sm:text-sm text-[#D7CBC0]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Open for Service</span>
            <span className="text-[#A89A8E]">until 19:00</span>
          </div>
          <div className="hidden sm:inline-block text-[#6D5D53]">/</div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C280]" />
            <span>Today’s Roast: Ethiopia Guji Uraga G1</span>
          </div>
          <div className="hidden sm:inline-block text-[#6D5D53]">/</div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#C27D4C]" />
            <span>Next Viennoiserie Batch: 13:00</span>
          </div>
        </div>

      </div>
    </section>
  );
};
