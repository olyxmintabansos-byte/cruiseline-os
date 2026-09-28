'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  DollarSign,
  Users,
  Wind,
  Sun,
  Waves,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useCruise } from '@/context/CruiseContext';

export default function StateRoomsPage() {
  const { voyages, selectVoyage, createBooking } = useCruise();
  const [selectedVoyage, setSelectedVoyage] = useState(voyages[0]?.code || '');
  const [selectedClass, setSelectedClass] = useState('BALCONY_SUITE');
  const [guestName, setGuestName] = useState('');

  const stateroom_classes = [
    {
      id: 'OCEAN_VIEW',
      name: 'Ocean View Cabin',
      description: 'Classic portside accommodation with ocean vistas',
      sqft: 150,
      amenities: ['Ocean View Window', 'Marble Bathroom', 'Mini Bar', 'Safe Deposit'],
      price_multi: 1.0,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'BALCONY_SUITE',
      name: 'Balcony Suite',
      description: 'Private verandah with exclusive lounge access',
      sqft: 280,
      amenities: ['Private Balcony', 'Spa Tub', 'Premium Bedding', 'Concierge Service', 'Priority Dining'],
      price_multi: 1.35,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'PENTHOUSE_PALATIAL',
      name: 'Penthouse Palatial Suite',
      description: 'Crown jewel. Multi-room palatial accommodation, butler service',
      sqft: 850,
      amenities: [
        'Wraparound Terrace',
        'Grand Piano',
        'Private Hot Tub',
        'Full Galley',
        'Butler 24/7',
        'Spa Access Unlimited',
        'Priority Everything',
        'Champagne & Caviar',
      ],
      price_multi: 2.2,
      color: 'from-yellow-400 to-amber-500',
    },
  ];

  const voyage = voyages.find((v) => v.code === selectedVoyage);
  const basePrice = voyage?.startingPriceUSD || 3850;
  const selectedStateroom = stateroom_classes.find((s) => s.id === selectedClass);
  const totalPrice = Math.round(basePrice * (selectedStateroom?.price_multi || 1));

  const handleBook = () => {
    if (!guestName || !voyage) return;
    createBooking({
      voyageCode: voyage.code,
      voyageTitle: voyage.title,
      vessel: voyage.vessel,
      stateroomClass: selectedClass,
      leadGuest: guestName,
      guestsCount: 2,
      totalCostUSD: totalPrice,
    });
    setGuestName('');
    alert(`Booking confirmed for ${guestName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b111e] via-[#0f1628] to-[#080d17]">
      {/* Header */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#1b2b48]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black font-serif text-white mb-4">
            STATEROOM <span className="text-amber-400">GALLERY</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Luxury accommodations from intimate cabins to palatial suites. Every room is an experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Voyage Selector */}
          <div className="mb-12 p-6 bg-[#0f1628] border-2 border-amber-400/20 rounded-xl">
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-3">SELECT YOUR VOYAGE</label>
            <select
              value={selectedVoyage}
              onChange={(e) => setSelectedVoyage(e.target.value)}
              className="w-full px-4 py-3 bg-[#1b2b48] border border-zinc-600 rounded-lg text-white font-bold focus:outline-none focus:border-amber-400"
            >
              {voyages.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.code} — {v.title} ({v.durationNights} nights)
                </option>
              ))}
            </select>
          </div>

          {/* Stateroom Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stateroom_classes.map((stateroom) => (
              <div
                key={stateroom.id}
                onClick={() => setSelectedClass(stateroom.id)}
                className={`relative group cursor-pointer p-8 rounded-xl border-2 transition-all transform ${
                  selectedClass === stateroom.id
                    ? `bg-gradient-to-br ${stateroom.color} text-black shadow-2xl -rotate-1 scale-105`
                    : 'bg-[#0f1628] border-zinc-700 hover:border-amber-300/50'
                }`}
              >
                {/* Crown Icon for Premium */}
                {stateroom.price_multi > 1.5 && (
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="w-5 h-5 text-amber-900" />
                  </div>
                )}

                <h3 className={`text-2xl font-serif font-black mb-2 ${selectedClass === stateroom.id ? 'text-black' : 'text-white'}`}>
                  {stateroom.name}
                </h3>
                <p className={`text-sm mb-4 ${selectedClass === stateroom.id ? 'text-black/70' : 'text-zinc-400'}`}>
                  {stateroom.description}
                </p>

                <div className={`mb-4 pb-4 border-b border-${selectedClass === stateroom.id ? 'black/20' : 'zinc-700'}`}>
                  <p className={`text-3xl font-bold ${selectedClass === stateroom.id ? 'text-black' : 'text-amber-300'}`}>
                    ${Math.round(basePrice * stateroom.price_multi).toLocaleString()}
                  </p>
                  <p className={`text-xs ${selectedClass === stateroom.id ? 'text-black/60' : 'text-zinc-400'} font-mono`}>
                    {stateroom.sqft} SQ FT
                  </p>
                </div>

                <div className="space-y-2">
                  {stateroom.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${selectedClass === stateroom.id ? 'text-black' : 'text-amber-400'}`} />
                      <span className={selectedClass === stateroom.id ? 'text-black' : 'text-zinc-300'}>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          {selectedStateroom && (
            <div className="relative bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border-2 border-amber-400/30 rounded-2xl p-8 sm:p-12">
              <div className="absolute -top-3 -left-6 w-14 h-10 bg-yellow-100/5 border border-yellow-400/20 rounded-sm -rotate-12 opacity-40" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-white mb-6">COMPLETE BOOKING</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Lead Guest Name</label>
                      <input
                        type="text"
                        placeholder="Captain's Full Name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-4 py-2 bg-[#1b2b48] border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={handleBook}
                      disabled={!guestName}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-black font-serif font-black rounded-lg transition-all shadow-lg shadow-amber-500/20"
                    >
                      RESERVE STATEROOM
                    </button>
                  </div>
                </div>

                <div className="bg-[#0f1628] border border-zinc-700 rounded-lg p-6">
                  <h4 className="font-serif font-black text-white mb-4">BOOKING SUMMARY</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-zinc-300">
                      <span>Voyage:</span>
                      <span className="font-bold text-white">{voyage?.code}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Stateroom:</span>
                      <span className="font-bold text-white">{selectedStateroom.name}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Duration:</span>
                      <span className="font-bold text-white">{voyage?.durationNights} Nights</span>
                    </div>
                    <div className="border-t border-zinc-700 pt-3 flex justify-between font-bold text-amber-300">
                      <span>Total:</span>
                      <span className="text-xl">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1b2b48] bg-[#05080e] py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-mono uppercase">STATEROOM SELECTIONS RESERVED FOR 48 HOURS FROM INQUIRY</p>
        </div>
      </footer>
    </div>
  );
}
