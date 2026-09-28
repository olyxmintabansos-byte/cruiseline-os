'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
  Anchor,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
  Ship,
} from 'lucide-react';
import { useCruise } from '@/context/CruiseContext';

export default function VoyagesPage() {
  const { voyages, bookings, activeVoyage, selectVoyage, createBooking } = useCruise();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVoyage, setSelectedVoyage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    leadGuest: '',
    guestsCount: 2,
    stateroomClass: 'OCEAN_VIEW',
  });

  const handleBooking = (voyageCode: string) => {
    const voyage = voyages.find((v) => v.code === voyageCode);
    if (!voyage) return;

    createBooking({
      voyageCode: voyage.code,
      voyageTitle: voyage.title,
      vessel: voyage.vessel,
      stateroomClass: formData.stateroomClass,
      leadGuest: formData.leadGuest,
      guestsCount: formData.guestsCount,
      totalCostUSD: voyage.startingPriceUSD * formData.guestsCount,
    });

    setFormData({ leadGuest: '', guestsCount: 2, stateroomClass: 'OCEAN_VIEW' });
    setShowBookingModal(false);
  };

  const stateroomClasses = [
    { id: 'OCEAN_VIEW', name: 'Ocean View', price: '+0%' },
    { id: 'BALCONY_SUITE', name: 'Balcony Suite', price: '+35%' },
    { id: 'PENTHOUSE_PALATIAL', name: 'Penthouse Palatial', price: '+120%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b111e] via-[#0f1628] to-[#080d17]">
      {/* Page Header */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#1b2b48]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black font-serif text-white mb-4">
            VOYAGE <span className="text-amber-400">ITINERARIES</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Browse our curated collection of transoceanic passages. From gala-filled transatlantic crossings to Antarctic expeditions, every voyage tells a story.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Voyage Selection Panel */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {voyages.map((voyage) => (
                  <div
                    key={voyage.id}
                    onClick={() => selectVoyage(voyage.id)}
                    className={`relative group cursor-pointer p-8 rounded-xl border-2 transition-all transform ${
                      activeVoyage?.id === voyage.id
                        ? 'bg-gradient-to-br from-[#1b2b48] to-[#141f33] border-amber-400/70 shadow-lg shadow-amber-500/20 -rotate-1'
                        : 'bg-[#0f1628] border-zinc-700 hover:border-amber-300/50 hover:bg-[#141f33]'
                    }`}
                  >
                    {/* Tape Decoration */}
                    <div className="absolute -top-3 -left-6 w-14 h-10 bg-yellow-100/5 border border-yellow-400/20 rounded-sm -rotate-12 opacity-40" />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono rounded-md">
                            {voyage.code}
                          </span>
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{voyage.region}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-black text-white mb-1">{voyage.title}</h3>
                        <p className="text-zinc-400 text-sm font-mono">Vessel: {voyage.vessel}</p>
                      </div>
                      <Ship className="w-8 h-8 text-amber-400 opacity-70" />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-zinc-700">
                      <div>
                        <span className="text-xs text-zinc-400 font-mono uppercase">Duration</span>
                        <p className="text-lg font-bold text-white">{voyage.durationNights} Nights</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-mono uppercase">Route</span>
                        <p className="text-sm font-bold text-zinc-200">{voyage.departurePort}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-mono uppercase">Available</span>
                        <p className="text-lg font-bold text-amber-300">{voyage.availableCabins} Cabins</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-mono uppercase">Starting From</span>
                        <p className="text-lg font-bold text-amber-400">${voyage.startingPriceUSD.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-mono text-zinc-400 uppercase mb-2">VOYAGE HIGHLIGHTS</p>
                      <div className="flex flex-wrap gap-2">
                        {voyage.highlights.map((highlight, idx) => (
                          <span key={idx} className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVoyage(voyage.code);
                        setShowBookingModal(true);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-black rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      <Anchor className="w-4 h-4" />
                      BOOK THIS PASSAGE
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: Active Voyage Details */}
            <div className="lg:col-span-1">
              {activeVoyage && (
                <div className="sticky top-24 space-y-6">
                  {/* Detailed Itinerary */}
                  <div className="bg-[#0f1628] border-2 border-amber-400/20 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-black text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      PORTS OF CALL
                    </h4>
                    <div className="space-y-3">
                      {activeVoyage.ports.map((port, idx) => (
                        <div key={idx} className="text-xs border-l-2 border-amber-400/30 pl-3 py-1">
                          <div className="font-bold text-white">Day {port.day}: {port.port}</div>
                          <div className="text-zinc-400">
                            {port.arriveTime} / {port.departTime}
                          </div>
                          <div className="text-amber-300 text-[11px] mt-1">{port.activity}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Bookings Preview */}
                  <div className="bg-[#0f1628] border-2 border-cyan-400/20 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-black text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      BOOKED PASSAGES ({bookings.length})
                    </h4>
                    {bookings.length > 0 ? (
                      <div className="space-y-2 text-xs">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="bg-cyan-500/5 border border-cyan-400/20 rounded-lg p-2">
                            <p className="font-bold text-white">{booking.leadGuest}</p>
                            <p className="text-zinc-400">{booking.voyageCode}</p>
                            <p className="text-cyan-300 font-mono text-[10px]">{booking.id}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-sm">No bookings yet. Be the first to set sail!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1628] border-2 border-amber-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-serif font-black text-white mb-1">RESERVE PASSAGE</h2>
            <p className="text-zinc-400 text-sm mb-6">Complete your cruise booking details.</p>

            <div className="space-y-4 mb-6">
              {/* Lead Guest */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Lead Passenger Name</label>
                <input
                  type="text"
                  placeholder="Captain's Name"
                  value={formData.leadGuest}
                  onChange={(e) => setFormData({ ...formData, leadGuest: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1b2b48] border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Passengers</label>
                <select
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#1b2b48] border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} Passenger{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stateroom Class */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Stateroom Class</label>
                <select
                  value={formData.stateroomClass}
                  onChange={(e) => setFormData({ ...formData, stateroomClass: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1b2b48] border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  {stateroomClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.price})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
              <p className="text-xs font-mono text-zinc-400 uppercase mb-1">Estimated Total</p>
              <p className="text-2xl font-serif font-black text-amber-300">
                ${(voyages.find((v) => v.code === selectedVoyage)?.startingPriceUSD || 0) * formData.guestsCount || 0}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition-colors font-bold"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  if (formData.leadGuest && selectedVoyage) {
                    handleBooking(selectedVoyage);
                  }
                }}
                disabled={!formData.leadGuest}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-black font-serif font-black rounded-lg transition-all"
              >
                CONFIRM BOOKING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
