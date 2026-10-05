import React, { useState } from 'react';
import { CartItem } from '../types/cafe';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderState, setOrderState] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [pickupTime, setPickupTime] = useState('In 15 minutes');
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const tipAmount = (subtotal * tipPercent) / 100;
  const total = subtotal + tipAmount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `MM-${Math.floor(100 + Math.random() * 900)}`;
    setOrderCode(code);
    setOrderState('success');
  };

  const handleCloseAndReset = () => {
    if (orderState === 'success') {
      onClearCart();
      setOrderState('cart');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD5C7] flex flex-col shadow-2xl text-[#1E1714]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#C27D4C]" />
              <h2 className="font-serif text-xl font-medium text-[#1E1714]">
                {orderState === 'success' ? 'Order Confirmed' : 'Your Order Bag'}
              </h2>
              {items.length > 0 && orderState === 'cart' && (
                <span className="text-xs text-[#827267] tabular-nums">
                  ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
                </span>
              )}
            </div>
            <button
              onClick={handleCloseAndReset}
              aria-label="Close bag drawer"
              className="text-[#827267] hover:text-[#1E1714] p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderState === 'success' ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#FAF2EB] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E0D7C9]">
                  <CheckCircle2 className="w-8 h-8 text-[#C27D4C]" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#1E1714] mb-2">
                  Preparing at the Bar
                </h3>
                <p className="text-sm text-[#5A473E] mb-6">
                  Thank you, <strong className="text-[#1E1714]">{customerName || 'Coffee Connoisseur'}</strong>. Present this ticket at the counter when you arrive.
                </p>

                <div className="bg-white border border-[#DDD5C7] p-5 text-left mb-6 space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
                    <span className="text-xs uppercase tracking-wider text-[#827267]">Ticket Number</span>
                    <span className="font-mono text-lg font-bold text-[#C27D4C]">{orderCode}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#5A473E]">
                    <span>Estimated Ready:</span>
                    <span className="font-medium text-[#1E1714]">{pickupTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#5A473E]">
                    <span>Pickup Location:</span>
                    <span className="font-medium text-[#1E1714]">The Roastery &amp; Courtyard</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#5A473E] pt-2 border-t border-[#F0ECE4]">
                    <span>Total Paid:</span>
                    <span className="font-semibold text-[#1E1714] tabular-nums">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseAndReset}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors"
                >
                  Done
                </button>
              </div>
            ) : orderState === 'checkout' ? (
              /* Checkout Form */
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <span className="text-xs uppercase tracking-wider text-[#827267]">Order Pickup Details</span>
                  <button
                    type="button"
                    onClick={() => setOrderState('cart')}
                    className="text-xs text-[#C27D4C] hover:underline"
                  >
                    Edit Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1.5">
                    Pickup Schedule
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['In 15 minutes', 'In 30 minutes', 'In 45 minutes'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setPickupTime(time)}
                        className={`p-2 text-xs text-center border transition-colors ${
                          pickupTime === time
                            ? 'bg-[#1E1714] text-white border-[#1E1714]'
                            : 'bg-white text-[#5A473E] border-[#DDD5C7] hover:border-[#827267]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marc Laurent"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                    Phone (for Ready notification) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 87 65 43 21"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                  />
                </div>

                {/* Barista Tip */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1.5">
                    Add a Barista &amp; Roaster Gratuity
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 10, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercent(pct)}
                        className={`py-2 text-xs font-medium border transition-colors ${
                          tipPercent === pct
                            ? 'bg-[#C27D4C] text-white border-[#C27D4C]'
                            : 'bg-white text-[#5A473E] border-[#DDD5C7] hover:border-[#827267]'
                        }`}
                      >
                        {pct === 0 ? 'None' : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-[#FAF2EB] p-4 space-y-2 border border-[#E0D7C9] text-xs">
                  <div className="flex justify-between text-[#5A473E]">
                    <span>Items Subtotal</span>
                    <span className="tabular-nums font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  {tipPercent > 0 && (
                    <div className="flex justify-between text-[#5A473E]">
                      <span>Barista Gratuity ({tipPercent}%)</span>
                      <span className="tabular-nums font-medium">€{tipAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold text-[#1E1714] pt-2 border-t border-[#E8E2D9]">
                    <span>Total Due at Counter</span>
                    <span className="tabular-nums font-serif text-base">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#DDD5C7] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#1E1714] mb-1">Your bag is empty</p>
                <p className="text-xs text-[#827267] max-w-xs mx-auto mb-6">
                  Explore our single-origin pour-overs, cold tonics, and freshly baked viennoiserie.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E1714] text-white"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-4">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="flex gap-4 p-3.5 bg-white border border-[#E8E2D9] relative"
                  >
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover bg-[#F2EDE4] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base font-medium text-[#1E1714] truncate">
                          {cartItem.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          aria-label={`Remove ${cartItem.menuItem.name}`}
                          className="text-[#A89A8E] hover:text-[#C27D4C] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-[#827267] space-y-0.5 mt-0.5">
                        {cartItem.temperature && <div>Prep: {cartItem.temperature}</div>}
                        {cartItem.selectedMilk && <div>Milk: {cartItem.selectedMilk}</div>}
                        {cartItem.selectedGrind && <div>Grind: {cartItem.selectedGrind}</div>}
                        {cartItem.specialNotes && <div className="italic">“{cartItem.specialNotes}”</div>}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#DDD5C7] bg-[#FAF8F5]">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="p-1 hover:bg-[#E8E0D5] transition-colors"
                          >
                            <Minus className="w-3 h-3 text-[#5A473E]" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#1E1714]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="p-1 hover:bg-[#E8E0D5] transition-colors"
                          >
                            <Plus className="w-3 h-3 text-[#5A473E]" />
                          </button>
                        </div>

                        <span className="font-serif text-base font-medium text-[#1E1714] tabular-nums">
                          €{(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {items.length > 0 && orderState !== 'success' && (
            <div className="p-6 bg-white border-t border-[#E8E2D9] space-y-4">
              {orderState === 'cart' ? (
                <>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#827267]">
                      <span>Estimated Prep Time</span>
                      <span className="font-medium text-[#1E1714] flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#C27D4C]" />
                        <span>12–15 mins</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-[#1E1714] pt-2 border-t border-[#F0ECE4]">
                      <span>Subtotal</span>
                      <span className="font-serif text-xl tabular-nums">€{subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOrderState('checkout')}
                    className="w-full py-4 text-xs font-semibold uppercase tracking-widest bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Pre-Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-4 text-xs font-semibold uppercase tracking-widest bg-[#C27D4C] hover:bg-[#D48D5C] text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Confirm Pre-Order · €{total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
