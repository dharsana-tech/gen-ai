import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#"
            className="font-serif text-2xl sm:text-3xl tracking-wide text-[#1E1714] font-medium hover:text-[#C27D4C] transition-colors whitespace-nowrap"
          >
            Maison Moka
          </a>

          {/* Zone 2: 4–6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5A473E]">
            <a
              href="#menu"
              className="hover:text-[#1E1714] transition-colors relative py-1 hover:border-b-2 hover:border-[#C27D4C]"
            >
              Menu
            </a>
            <a
              href="#craft"
              className="hover:text-[#1E1714] transition-colors relative py-1 hover:border-b-2 hover:border-[#C27D4C]"
            >
              The Craft
            </a>
            <a
              href="#finder"
              className="hover:text-[#1E1714] transition-colors relative py-1 hover:border-b-2 hover:border-[#C27D4C]"
            >
              Flavor Compass
            </a>
            <a
              href="#press"
              className="hover:text-[#1E1714] transition-colors relative py-1 hover:border-b-2 hover:border-[#C27D4C]"
            >
              Critique
            </a>
            <a
              href="#locations"
              className="hover:text-[#1E1714] transition-colors relative py-1 hover:border-b-2 hover:border-[#C27D4C]"
            >
              Locations & Hours
            </a>
          </nav>

          {/* Zone 3: 1–2 Primary Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1E1714] bg-[#F2EDE4] hover:bg-[#E8E0D5] border border-[#DDD5C7] rounded-none transition-colors whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C27D4C]" />
              <span>Reserve Table</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1714] hover:bg-[#332822] rounded-none transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E6C280]" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-[#C27D4C] text-white rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#1E1714] hover:text-[#C27D4C] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] bg-[#FAF8F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#2C211C]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C27D4C] transition-colors"
            >
              Autumn Menu
            </a>
            <a
              href="#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C27D4C] transition-colors"
            >
              Our Roasting & Bakery Craft
            </a>
            <a
              href="#finder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C27D4C] transition-colors"
            >
              Coffee & Flavor Compass
            </a>
            <a
              href="#press"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C27D4C] transition-colors"
            >
              Press Reviews
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C27D4C] transition-colors"
            >
              Hours & Addresses
            </a>
          </nav>
          <div className="pt-3 border-t border-[#E8E2D9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-center text-[#1E1714] bg-[#F2EDE4] border border-[#DDD5C7] transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-[#C27D4C]" />
              <span>Book a Table Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
