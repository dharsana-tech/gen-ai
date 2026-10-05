import React, { useState } from 'react';
import { CAFE_LOCATIONS } from '../data/cafeData';
import { MapPin, Clock, Navigation, Phone, Mail, Check, Copy } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Compute live open status based on current Paris/local time
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= 7 && currentHour < 19;

  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="locations" className="py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E8E2D9] gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#827267] mb-3">
              <span>Sanctuaries in Paris</span>
              <span aria-hidden="true">·</span>
              <span>Two Distinct Atmospheres</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1714] tracking-tight leading-tight">
              Locations, Hours &amp; Live Seating
            </h2>
            <p className="mt-3 text-[#5A473E] text-base leading-relaxed font-light">
              Whether you are looking for a sun-drenched courtyard afternoon or a rapid morning double ristretto along the Seine.
            </p>
          </div>

          {/* Real-time Status Badge */}
          <div className="bg-white border border-[#E0D7C9] p-4 flex items-center space-x-3 shrink-0">
            <span
              className={`w-3 h-3 rounded-full ${
                isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'
              }`}
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1E1714]">
                {isOpenNow ? 'Service Active Right Now' : 'Closed for the Night'}
              </div>
              <div className="text-xs text-[#827267]">
                {isOpenNow
                  ? 'Espresso bar & seating open until 19:00'
                  : 'Doors open tomorrow morning at 07:30'}
              </div>
            </div>
          </div>
        </div>

        {/* 2 Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {CAFE_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-white border border-[#E8E2D9] p-8 sm:p-10 flex flex-col justify-between hover:border-[#C27D4C]/70 transition-colors shadow-sm"
            >
              <div>
                {/* Location Badge / Subtitle */}
                <div className="text-xs font-serif italic text-[#C27D4C] mb-1">
                  {loc.subname}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1714] mb-4">
                  {loc.name}
                </h3>

                {/* Address & Transit */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[#F0ECE4] text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#C27D4C] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#1E1714] font-medium">{loc.address}</span>
                      <div className="text-xs text-[#827267] mt-0.5">{loc.transit}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-[#C27D4C] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#5A473E] space-y-0.5">
                      <div><strong className="text-[#1E1714]">Monday — Friday:</strong> {loc.hoursWeekday}</div>
                      <div><strong className="text-[#1E1714]">Saturday — Sunday:</strong> {loc.hoursWeekend}</div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#827267] block mb-2.5">
                    Spatial Features &amp; Capacity
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {loc.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs bg-[#FAF8F5] text-[#5A473E] border border-[#E8E2D9] px-3 py-1"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions & Contact */}
              <div className="pt-6 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#827267] space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#A89A8E]" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#A89A8E]" />
                    <span>{loc.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyAddress(loc.id, loc.address)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#F2EDE4] hover:bg-[#E8E0D5] text-[#1E1714] border border-[#DDD5C7] transition-colors flex items-center space-x-2"
                >
                  {copiedId === loc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C27D4C]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
