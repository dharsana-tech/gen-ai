import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem, MenuCategory, DietaryTag, CartItem } from '../types/cafe';
import { Plus, SlidersHorizontal, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory; label: string; count: number }[] = [
  { id: 'coffee', label: 'Specialty Coffee', count: 4 },
  { id: 'signature', label: 'Signature Tonics & Elixirs', count: 3 },
  { id: 'pastry', label: 'Artisanal Viennoiserie', count: 4 },
  { id: 'brunch', label: 'Tartines & Brunch', count: 2 },
  { id: 'retail-beans', label: 'Retail Roasts (250g)', count: 3 },
];

const DIETARY_FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'House Specialty', label: 'House Signature' },
  { id: 'Single Origin', label: 'Single Origin' },
  { id: 'Vegetarian', label: 'Vegetarian' },
  { id: 'Vegan', label: 'Plant-Based' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('coffee');
  const [activeDietary, setActiveDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesDietary =
        activeDietary === 'all' ||
        (item.dietary && item.dietary.includes(activeDietary as DietaryTag));
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tastingNotes &&
          item.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, activeDietary, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-3">
            <span>Autumn 2026 Collection</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Lot Harvests</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1714] tracking-tight leading-tight">
            Curated Autumn Menu &amp; Pâtisserie
          </h2>
          <p className="mt-3 text-[#5A473E] text-base leading-relaxed">
            Every cup is dialed daily by weight and TDS refractometer. Every pastry is laminated with Normandy AOP butter and stone-ground heritage grain.
          </p>
        </div>

        {/* Category Tabs (Segmented Control conforming to skill) */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8E2D9] mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-3 text-xs sm:text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                  isActive
                    ? 'border-[#C27D4C] text-[#1E1714] font-semibold bg-[#F5EFE8]/50'
                    : 'border-transparent text-[#827267] hover:text-[#1E1714] hover:border-[#DDD5C7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Dietary & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EFE9E0]">
          {/* Dietary Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {DIETARY_FILTERS.map((df) => {
              const isSelected = activeDietary === df.id;
              return (
                <button
                  key={df.id}
                  onClick={() => setActiveDietary(df.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-none border transition-colors ${
                    isSelected
                      ? 'bg-[#1E1714] text-white border-[#1E1714]'
                      : 'bg-white text-[#5A473E] border-[#E0D7C9] hover:border-[#827267]'
                  }`}
                >
                  {df.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search origin, jasmine, butter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs bg-white border border-[#E0D7C9] text-[#1E1714] placeholder-[#A89A8E] focus:outline-none focus:border-[#C27D4C]"
            />
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#DDD5C7] bg-[#F7F4EE]">
            <p className="font-serif text-2xl text-[#1E1714] mb-2">No delicacies found in this selection</p>
            <p className="text-sm text-[#827267] mb-6">Try clearing dietary filters or searching a different flavor profile.</p>
            <button
              onClick={() => {
                setActiveDietary('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E1714] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white border border-[#E8E2D9] hover:border-[#C27D4C]/60 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
              >
                {/* Product Image Lead with Fallback Container */}
                <div className="relative aspect-[4/3] bg-[#F2EDE4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed origin/roast tag */}
                  {item.roastLevel && (
                    <div className="absolute bottom-3 left-3 bg-[#1E1714]/85 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1">
                      {item.roastLevel} Roast
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* French subtitle & origin */}
                    <div className="flex items-center justify-between text-xs text-[#827267] mb-1.5">
                      <span className="uppercase tracking-widest text-[11px] font-medium truncate">
                        {item.frenchName || item.category}
                      </span>
                      {item.origin && (
                        <span className="text-[11px] text-[#A89A8E] truncate max-w-[140px] text-right">
                          {item.origin.split('·')[0]}
                        </span>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="font-serif text-2xl font-medium text-[#1E1714] leading-snug group-hover:text-[#C27D4C] transition-colors mb-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#5A473E] leading-relaxed line-clamp-2 mb-4 font-light">
                      {item.description}
                    </p>

                    {/* Tasting Notes: Clean Unboxed Metadata with separators (Strict Anti-Pill) */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#827267] mb-4 pb-4 border-b border-[#F0ECE4]">
                        <span className="text-[#C27D4C] font-serif italic">Notes:</span>
                        {item.tastingNotes.map((note, idx) => (
                          <React.Fragment key={note}>
                            <span className="text-[#2C211C] font-medium">{note}</span>
                            {idx < item.tastingNotes!.length - 1 && (
                              <span aria-hidden="true" className="text-[#D0C5B8]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Module */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xs text-[#827267] block uppercase tracking-wider">Price</span>
                      <span className="font-serif text-xl sm:text-2xl font-medium text-[#1E1714] tabular-nums">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.customizable ? (
                        <button
                          onClick={() => onSelectItemToCustomize(item)}
                          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#F2EDE4] hover:bg-[#E8E0D5] text-[#1E1714] border border-[#DDD5C7] transition-colors"
                        >
                          Customize
                        </button>
                      ) : (
                        <button
                          onClick={() => onQuickAdd(item)}
                          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors flex items-center space-x-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
