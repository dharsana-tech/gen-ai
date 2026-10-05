import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem, CartItem } from '../types/cafe';
import { Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CoffeeFinderProps {
  onAddDuoToCart: (coffee: MenuItem, pastry?: MenuItem) => void;
}

const MOMENTS = [
  { id: 'morning', label: 'Morning Awakening', desc: 'Seeking clean vitality & bright clarity' },
  { id: 'focus', label: 'Deep Afternoon Focus', desc: 'Prolonged contemplative calm & balanced body' },
  { id: 'indulgence', label: 'Sweet Pâtisserie Ritual', desc: 'Rich comfort, decadent aromas & buttery harmony' },
  { id: 'refresh', label: 'Crisp & Effervescent', desc: 'Chilled tonic, botanicals & sparkling lightness' },
];

const FLAVORS = [
  { id: 'floral', label: 'Jasmine, White Peach & Bergamot', tag: 'Floral & Bright' },
  { id: 'cacao', label: 'Dark Cacao, Praline & Brown Butter', tag: 'Rich & Toasty' },
  { id: 'botanical', label: 'Cardamom Pods, Orange Zest & Spices', tag: 'Spiced & Vibrant' },
  { id: 'tea', label: 'Japanese Ceremonial Umami & Honey', tag: 'Herbaceous & Sweet' },
];

export const CoffeeFinder: React.FC<CoffeeFinderProps> = ({ onAddDuoToCart }) => {
  const [selectedMoment, setSelectedMoment] = useState('morning');
  const [selectedFlavor, setSelectedFlavor] = useState('floral');

  // Compute recommendation
  const recommendation = React.useMemo(() => {
    let coffee: MenuItem;
    let pastry: MenuItem;
    let rationale: string;

    if (selectedMoment === 'refresh' || selectedFlavor === 'botanical') {
      coffee = MENU_ITEMS.find((m) => m.id === 's-1') || MENU_ITEMS[0];
      pastry = MENU_ITEMS.find((m) => m.id === 'p-3') || MENU_ITEMS[4];
      rationale = 'The sparkling cardamom notes and citrus bloom of the tonic balance seamlessly with the nutty Sicilian pistachio and spice in our escargot roll.';
    } else if (selectedFlavor === 'cacao' || selectedMoment === 'focus') {
      coffee = MENU_ITEMS.find((m) => m.id === 'c-1') || MENU_ITEMS[0];
      pastry = MENU_ITEMS.find((m) => m.id === 'p-2') || MENU_ITEMS[5];
      rationale = 'The velvety micro-textured Guernsey milk and espresso ristretto elevate the bittersweet 70% Valrhona dark chocolate inside the flaky sourdough brioche.';
    } else if (selectedFlavor === 'tea') {
      coffee = MENU_ITEMS.find((m) => m.id === 's-2') || MENU_ITEMS[0];
      pastry = MENU_ITEMS.find((m) => m.id === 'p-4') || MENU_ITEMS[6];
      rationale = 'Hand-whisked Yame ceremonial green tea brings grassy umami that cuts cleanly through the caramelized Breton butter crunch of the Kouign-Amann.';
    } else {
      coffee = MENU_ITEMS.find((m) => m.id === 'c-2') || MENU_ITEMS[1];
      pastry = MENU_ITEMS.find((m) => m.id === 'p-1') || MENU_ITEMS[4];
      rationale = 'The sparkling bergamot and white peach clarity of our Ethiopian Chemex hand-pour contrasts gracefully against the pure caramelized butter flakes of our 48-hour croissant.';
    }

    return { coffee, pastry, rationale };
  }, [selectedMoment, selectedFlavor]);

  return (
    <section id="finder" className="py-24 bg-[#F5EFE8] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C27D4C]" />
            <span>Interactive Sensory Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1714] tracking-tight leading-tight">
            The Flavor Compass &amp; Pairing Finder
          </h2>
          <p className="mt-3 text-[#5A473E] text-base leading-relaxed">
            Select your current state of mind and preferred sensory palette to reveal a personalized coffee extraction and viennoiserie pairing.
          </p>
        </div>

        {/* Interactive Dual Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Interactive Selectors */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-10 border border-[#E0D7C9] space-y-8 flex flex-col justify-between">
            {/* Step 1: Moment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#827267]">
                  01. Choose Your Daily Rhythm
                </span>
                <span className="text-xs text-[#C27D4C] font-serif italic">Atmosphere</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOMENTS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMoment(m.id)}
                    className={`p-4 text-left border transition-all ${
                      selectedMoment === m.id
                        ? 'border-[#1E1714] bg-white shadow-sm'
                        : 'border-[#E0D7C9] bg-transparent hover:border-[#827267]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-medium text-[#1E1714]">
                        {m.label}
                      </span>
                      {selectedMoment === m.id && <Check className="w-4 h-4 text-[#C27D4C]" />}
                    </div>
                    <p className="text-xs text-[#827267] leading-relaxed">
                      {m.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor note preference */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#827267]">
                  02. Preferred Sensory Profile
                </span>
                <span className="text-xs text-[#C27D4C] font-serif italic">Taste notes</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFlavor(f.id)}
                    className={`p-4 text-left border transition-all ${
                      selectedFlavor === f.id
                        ? 'border-[#1E1714] bg-white shadow-sm'
                        : 'border-[#E0D7C9] bg-transparent hover:border-[#827267]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C27D4C]">
                        {f.tag}
                      </span>
                      {selectedFlavor === f.id && <Check className="w-4 h-4 text-[#C27D4C]" />}
                    </div>
                    <p className="font-serif text-base font-medium text-[#1E1714]">
                      {f.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Note on Craft */}
            <div className="pt-4 border-t border-[#E8E2D9] text-xs text-[#827267] flex items-center justify-between">
              <span>Calibrated fresh daily on Mahlkönig EK43 grinders</span>
              <span className="font-serif italic text-[#1E1714]">Zero compromise</span>
            </div>
          </div>

          {/* Right: Bespoke Recommendation Card */}
          <div className="lg:col-span-5 bg-[#1E1714] text-[#FAF8F5] p-6 sm:p-10 flex flex-col justify-between border border-[#332822] shadow-2xl">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-[#C27D4C] font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Tasting Duo</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-snug mb-4 text-[#FAF8F5]">
                {recommendation.coffee.name}
              </h3>

              <p className="text-sm text-[#D7CBC0] leading-relaxed mb-6 font-light">
                {recommendation.rationale}
              </p>

              {/* Duo Breakdown List */}
              <div className="space-y-4 pt-4 border-t border-white/10 mb-8">
                {/* Coffee item */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={recommendation.coffee.image}
                      alt={recommendation.coffee.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover border border-white/20"
                    />
                    <div>
                      <p className="font-serif text-lg text-white font-medium">
                        {recommendation.coffee.name}
                      </p>
                      <p className="text-xs text-[#A89A8E]">
                        {recommendation.coffee.origin?.split('·')[0] || 'Artisan Extraction'}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-lg text-[#E6C280] tabular-nums">
                    €{recommendation.coffee.price.toFixed(2)}
                  </span>
                </div>

                {/* Pastry Pairing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={recommendation.pastry.image}
                      alt={recommendation.pastry.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover border border-white/20"
                    />
                    <div>
                      <p className="font-serif text-lg text-white font-medium">
                        {recommendation.pastry.name}
                      </p>
                      <p className="text-xs text-[#A89A8E]">
                        Viennoiserie Pairing
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-lg text-[#E6C280] tabular-nums">
                    €{recommendation.pastry.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA to add both */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#D7CBC0] mb-3">
                <span>Duo Tasting Price</span>
                <span className="font-serif text-xl text-white font-medium tabular-nums">
                  €{(recommendation.coffee.price + recommendation.pastry.price).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => onAddDuoToCart(recommendation.coffee, recommendation.pastry)}
                className="w-full py-4 text-xs font-semibold uppercase tracking-widest bg-[#C27D4C] hover:bg-[#D48D5C] text-white transition-colors flex items-center justify-center space-x-2"
              >
                <span>Add Curated Duo to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
