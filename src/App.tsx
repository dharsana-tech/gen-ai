/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CoffeeFinder } from './components/CoffeeFinder';
import { CraftStory } from './components/CraftStory';
import { PressReviews } from './components/PressReviews';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { MenuItem, CartItem, ReservationData } from './types/cafe';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show transient toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add customized or standard item
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item configuration exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.menuItem.id === newItem.menuItem.id &&
          i.selectedMilk === newItem.selectedMilk &&
          i.selectedGrind === newItem.selectedGrind &&
          i.temperature === newItem.temperature
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`Added ${newItem.quantity} × ${newItem.menuItem.name} to your bag`);
  };

  // Quick standard add from menu
  const handleQuickAdd = (item: MenuItem) => {
    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
    };
    handleAddToCart(newItem);
  };

  // Add paired duo from flavor compass
  const handleAddDuoToCart = (coffee: MenuItem, pastry?: MenuItem) => {
    handleAddToCart({
      cartItemId: `${coffee.id}-${Date.now()}`,
      menuItem: coffee,
      quantity: 1,
      selectedMilk: coffee.availableMilks ? coffee.availableMilks[0] : undefined,
    });

    if (pastry) {
      handleAddToCart({
        cartItemId: `${pastry.id}-${Date.now() + 1}`,
        menuItem: pastry,
        quantity: 1,
      });
    }

    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleConfirmReservation = (res: ReservationData) => {
    showToast(`Table confirmed for ${res.guests} guests on ${res.date}`);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1714] font-sans selection:bg-[#E8DCCF]">
      
      {/* Top Bar adhering to 3-zone contract */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Cinematic Hero */}
        <Hero
          onExploreMenu={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Autumn Menu & Online Pre-Order */}
        <MenuSection
          onSelectItemToCustomize={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Sensory Coffee & Pairing Finder */}
        <CoffeeFinder onAddDuoToCart={handleAddDuoToCart} />

        {/* Craft & Roasting Story */}
        <CraftStory />

        {/* Press & Critical Acclaim */}
        <PressReviews />

        {/* Locations, Hours & Live Seating Status */}
        <LocationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Takeaway Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onConfirmReservation={handleConfirmReservation}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1714] text-white px-5 py-3.5 border border-[#42342D] shadow-2xl flex items-center space-x-3 transition-all animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C27D4C] shrink-0" />
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
