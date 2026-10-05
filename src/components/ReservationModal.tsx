import React, { useState } from 'react';
import { X, Check, Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { ReservationData } from '../types/cafe';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (data: ReservationData) => void;
}

const SEATING_AREAS = [
  { id: 'courtyard', name: 'Olive Tree Courtyard Garden', note: 'Sun-drenched cobblestone terrace' },
  { id: 'window', name: 'Sunlit Window Bench', note: 'Overlooking Rue des Marronniers' },
  { id: 'hall', name: 'Historic Roastery Hall', note: 'Adjacent to our vintage 1968 Probat roaster' },
  { id: 'bar', name: 'Marble Espresso Counter', note: 'Front-row view of our baristas at work' },
];

const TIME_SLOTS = [
  { time: '08:30 AM', label: 'Morning Dawn Coffee & Viennoiserie' },
  { time: '10:00 AM', label: 'Mid-Morning Tasting' },
  { time: '11:45 AM', label: 'Artisanal Brunch & Tartines' },
  { time: '01:30 PM', label: 'Post-Lunch Coffee Service' },
  { time: '03:30 PM', label: 'Afternoon Tea & Pâtisserie Hour' },
  { time: '05:30 PM', label: 'Sunset Chemex & Cold Drip Ritual' },
];

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirmReservation,
}) => {
  if (!isOpen) return null;

  // Form states
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1].time);
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState(SEATING_AREAS[0].name);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedData, setConfirmedData] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const code = `MOKA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: ReservationData = {
      id: code,
      date,
      timeSlot,
      guests,
      seatingArea,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString(),
    };

    setConfirmedData(newReservation);
    onConfirmReservation(newReservation);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    setConfirmedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-[#FAF8F5] border border-[#DDD5C7] max-w-xl w-full p-6 sm:p-10 shadow-2xl text-[#1E1714]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close reservation modal"
          className="absolute top-5 right-5 text-[#827267] hover:text-[#1E1714] p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#C27D4C] mb-2">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Table Hospitality</span>
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#1E1714]">
                Reserve Your Table at Maison Moka
              </h2>
              <p className="text-sm text-[#5A473E] mt-1.5 font-light">
                Courtyard tables are held for 15 minutes. We look forward to hosting your morning ritual.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2">
                    Date of Visit
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2">
                    Party Size
                  </label>
                  <div className="flex items-center border border-[#DDD5C7] bg-white h-[42px]">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`flex-1 h-full text-xs font-medium transition-colors ${
                          guests === num
                            ? 'bg-[#1E1714] text-white font-semibold'
                            : 'text-[#5A473E] hover:bg-[#F2EDE4]'
                        }`}
                      >
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2">
                  Preferred Seating Atmosphere
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SEATING_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.name)}
                      className={`p-3 text-left border transition-colors ${
                        seatingArea === area.name
                          ? 'border-[#C27D4C] bg-[#FAF2EB] text-[#1E1714]'
                          : 'border-[#DDD5C7] bg-white text-[#5A473E] hover:border-[#827267]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-[#1E1714]">
                        <span>{area.name}</span>
                        {seatingArea === area.name && <Check className="w-3.5 h-3.5 text-[#C27D4C]" />}
                      </div>
                      <p className="text-[11px] text-[#827267] mt-0.5">{area.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot pills */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-2">
                  Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTimeSlot(slot.time)}
                      className={`p-2.5 text-xs text-center border transition-colors ${
                        timeSlot === slot.time
                          ? 'bg-[#1E1714] text-white border-[#1E1714] font-medium'
                          : 'bg-white text-[#5A473E] border-[#DDD5C7] hover:border-[#827267]'
                      }`}
                    >
                      <div className="font-semibold">{slot.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest details */}
              <div className="space-y-3 pt-3 border-t border-[#E8E2D9]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Éléonore de la Tour"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleonore@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                      Telephone (for SMS reminder)
                    </label>
                    <input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A473E] mb-1">
                    Dietary Allergies or Special Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Nut allergy, celebrating an anniversary"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#DDD5C7] text-[#1E1714] focus:outline-none focus:border-[#C27D4C]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold uppercase tracking-widest bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors"
                >
                  Confirm Table Reservation
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Receipt State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#FAF2EB] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E0D7C9]">
              <CheckCircle2 className="w-8 h-8 text-[#C27D4C]" />
            </div>

            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-2">
              <span>Reservation Confirmed</span>
            </div>

            <h2 className="font-serif text-3xl font-medium text-[#1E1714] mb-2">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-sm text-[#5A473E] max-w-md mx-auto mb-8 font-light">
              A confirmation email has been dispatched to <strong className="text-[#1E1714]">{confirmedData?.guestEmail}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-white border border-[#DDD5C7] p-6 text-left max-w-md mx-auto mb-8 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <span className="text-xs uppercase tracking-wider text-[#827267]">Booking Code</span>
                <span className="font-mono text-base font-bold text-[#C27D4C] tracking-wider">
                  {confirmedData?.id}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#827267]">Guest</span>
                <span className="font-medium text-[#1E1714]">{confirmedData?.guestName}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#827267]">Date &amp; Time</span>
                <span className="font-medium text-[#1E1714]">{confirmedData?.date} at {confirmedData?.timeSlot}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#827267]">Party</span>
                <span className="font-medium text-[#1E1714]">{confirmedData?.guests} Guests</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#827267]">Atmosphere</span>
                <span className="font-medium text-[#1E1714]">{confirmedData?.seatingArea}</span>
              </div>

              {confirmedData?.specialRequests && (
                <div className="pt-2 text-xs text-[#827267] italic border-t border-[#F0ECE4]">
                  “{confirmedData.specialRequests}”
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-widest bg-[#1E1714] hover:bg-[#C27D4C] text-white transition-colors"
            >
              Return to Maison Moka
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
