import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types/cafe';
import { X, Check, Plus, Minus } from 'lucide-react';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState(item.availableMilks?.[0] || 'Oat Milk (Minor Figures)');
  const [selectedGrind, setSelectedGrind] = useState(item.availableGrinds?.[0] || 'Whole Bean (Recommended)');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [specialNotes, setSpecialNotes] = useState('');

  const handleAdd = () => {
    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedMilk: item.availableMilks ? selectedMilk : undefined,
      selectedGrind: item.availableGrinds ? selectedGrind : undefined,
      temperature: item.category === 'coffee' || item.category === 'signature' ? temperature : undefined,
      specialNotes: specialNotes.trim() ? specialNotes.trim() : undefined,
    };
    onAddToCart(newItem);
    onClose();
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-[#FAF8F5] border border-[#DDD5C7] max-w-lg w-full p-6 sm:p-8 shadow-2xl text-[#1E1714]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close customizer"
          className="absolute top-5 right-5 text-[#827267] hover:text-[#1E1714] p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Preview */}
        <div className="flex gap-4 items-start mb-6 pb-6 border-b border-[#E8E2D9]">
          <div className="w-20 h-20 bg-[#F2EDE4] shrink-0 overflow-hidden border border-[#E0D7C9]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {item.frenchName && (
              <p className="text-xs uppercase tracking-widest text-[#827267] font-medium mb-1">
                {item.frenchName}
              </p>
            )}
            <h3 className="font-serif text-2xl font-medium text-[#1E1714]">
              {item.name}
            </h3>
            <p className="text-sm text-[#C27D4C] font-semibold tabular-nums mt-1">
              €{item.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1">
          {/* Temperature for drinks */}
          {(item.category === 'coffee' || item.category === 'signature') && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2.5">
                Preparation Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hot', 'Iced'] as const).map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setTemperature(temp)}
                    className={`py-2.5 px-4 text-xs font-medium uppercase tracking-wider border transition-colors ${
                      temperature === temp
                        ? 'bg-[#1E1714] text-white border-[#1E1714]'
                        : 'bg-white text-[#5A473E] border-[#DDD5C7] hover:border-[#827267]'
                    }`}
                  >
                    {temp === 'Hot' ? 'Steamed Warm (65°C)' : 'Over Crystal Clear Ice'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk selection */}
          {item.availableMilks && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2.5">
                Choice of Milk
              </label>
              <div className="space-y-2">
                {item.availableMilks.map((milk) => (
                  <button
                    key={milk}
                    type="button"
                    onClick={() => setSelectedMilk(milk)}
                    className={`w-full flex items-center justify-between py-2.5 px-3.5 text-xs text-left border transition-colors ${
                      selectedMilk === milk
                        ? 'border-[#C27D4C] bg-[#FAF2EB] text-[#1E1714] font-medium'
                        : 'border-[#DDD5C7] bg-white text-[#5A473E] hover:border-[#827267]'
                    }`}
                  >
                    <span>{milk}</span>
                    {selectedMilk === milk && <Check className="w-4 h-4 text-[#C27D4C]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bean Grind options */}
          {item.availableGrinds && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2.5">
                Grind Specification for 250g Bag
              </label>
              <div className="space-y-2">
                {item.availableGrinds.map((grind) => (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setSelectedGrind(grind)}
                    className={`w-full flex items-center justify-between py-2.5 px-3.5 text-xs text-left border transition-colors ${
                      selectedGrind === grind
                        ? 'border-[#C27D4C] bg-[#FAF2EB] text-[#1E1714] font-medium'
                        : 'border-[#DDD5C7] bg-white text-[#5A473E] hover:border-[#827267]'
                    }`}
                  >
                    <span>{grind}</span>
                    {selectedGrind === grind && <Check className="w-4 h-4 text-[#C27D4C]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Barista instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2">
              Barista or Kitchen Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., extra hot, less sweet, no napkins needed"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] placeholder-[#A89A8E] focus:outline-none focus:border-[#C27D4C]"
            />
          </div>
        </div>

        {/* Footer with quantity and add to cart */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center border border-[#DDD5C7] bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="p-2 text-[#5A473E] hover:text-[#1E1714] hover:bg-[#F2EDE4] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1 text-sm font-semibold tabular-nums text-[#1E1714]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="p-2 text-[#5A473E] hover:text-[#1E1714] hover:bg-[#F2EDE4] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors"
          >
            Add to Bag · €{totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};
