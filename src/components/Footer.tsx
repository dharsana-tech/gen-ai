import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#191310] text-[#E8E0D5] pt-20 pb-12 border-t border-[#2C211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-wide text-white block">
              Maison Moka
            </span>
            <p className="text-sm text-[#A89A8E] max-w-sm leading-relaxed font-light">
              Artisanal specialty coffee roastery and viennoiserie atelier founded in Paris. Committed to micro-lot direct trade, 48-hour lamination, and quiet morning mindfulness.
            </p>
            <div className="pt-2 text-xs text-[#827267] space-y-1">
              <div>Member of the Specialty Coffee Association (SCA)</div>
              <div>Certified Organic &amp; Direct Trade Partner</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E6C280] block mb-4">
              Explore
            </span>
            <ul className="space-y-2 text-sm text-[#D7CBC0]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Seasonal Autumn Menu
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  The Roasting &amp; Baking Philosophy
                </a>
              </li>
              <li>
                <a href="#finder" className="hover:text-white transition-colors">
                  Sensory Flavor Compass
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  Courtyard &amp; Atelier Hours
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">
                  Press &amp; Gastronomy Praise
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E6C280] block mb-2">
              The Harvest Gazette
            </span>
            <p className="text-xs text-[#A89A8E] leading-relaxed">
              Subscribers receive first access to limited 200-bag micro-lot allocations from Ethiopia, Panama Geishas, and weekend viennoiserie specials.
            </p>

            {subscribed ? (
              <div className="bg-[#241C18] border border-[#3A2D26] p-4 text-xs text-[#E8D8C8] flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C27D4C] shrink-0" />
                <span>Merci. You are now inscribed in our quarterly Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#241C18] border border-[#3A2D26] px-3.5 py-2.5 text-xs text-white placeholder-[#786960] focus:outline-none focus:border-[#C27D4C] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#C27D4C] hover:bg-[#D48D5C] text-white px-4 text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#786960] gap-4">
          <div>
            © {new Date().getFullYear()} Maison Moka Paris. Hand-crafted with reverence for origin.
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#827267]">
            <span>Rue des Marronniers</span>
            <span aria-hidden="true">·</span>
            <span>Quai de l’Horloge</span>
            <span aria-hidden="true">·</span>
            <span>Paris, France</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
