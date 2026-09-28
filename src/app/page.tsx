'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Ship,
  Compass,
  Navigation,
  Sparkles,
  ArrowRight,
  Globe,
  Calendar,
} from 'lucide-react';
import { useCruise } from '@/context/CruiseContext';

export default function HomePage() {
  const { voyages, selectVoyage } = useCruise();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    { id: 'TRANSATLANTIC', label: 'TRANSATLANTIC CROSSING', icon: '🌊', color: 'from-cyan-500 to-blue-600' },
    { id: 'MEDITERRANEAN', label: 'MEDITERRANEAN ODYSSEY', icon: '⛵', color: 'from-amber-500 to-orange-600' },
    { id: 'ANTARCTIC_EXPEDITION', label: 'ANTARCTIC EXPEDITION', icon: '❄️', color: 'from-slate-400 to-blue-500' },
    { id: 'CARIBBEAN_ARCHIPELAGO', label: 'CARIBBEAN ISLANDS', icon: '🏝️', color: 'from-green-500 to-emerald-600' },
    { id: 'NORDIC_FJORDS', label: 'NORDIC FJORDS', icon: '🏔️', color: 'from-purple-500 to-indigo-600' },
  ];

  const filtered = selectedRegion
    ? voyages.filter((v) => v.region === selectedRegion)
    : voyages;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b111e] via-[#0f1628] to-[#080d17] overflow-hidden">
      {/* Hero Banner - Collage Ephemera Theme */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Vintage Passport Stamp Decoration */}
          <div className="absolute top-8 left-8 w-16 h-16 border-4 border-dashed border-amber-400/40 rounded-lg flex items-center justify-center opacity-50 rotate-12">
            <span className="text-xs font-mono tracking-widest text-amber-400 font-bold">VINTAGE</span>
          </div>
          <div className="absolute top-32 right-12 w-12 h-12 border-2 border-cyan-400/50 rounded-full opacity-40 animate-pulse" />

          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b2b48]/60 border border-amber-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-serif text-amber-300 font-bold">SOUVENIR MARITIME COLLECTION</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight font-serif text-white mb-4">
            SOVEREIGN <span className="text-amber-400">CRUISELINE</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 font-serif mb-8 max-w-2xl mx-auto">
            Transoceanic voyages with vintage charm, collage-style ephemera, and maritime telemetry. Reserve your passage now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/voyages/"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-black rounded-xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              <span>EXPLORE VOYAGES</span>
            </Link>
            <Link
              href="/logbook/"
              className="px-8 py-3 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 font-serif font-black rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>CAPTAIN'S LOG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Overview - Collage Cards */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-[#1b2b48]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black font-serif text-white mb-2">FLEET VESSELS</h2>
              <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest">3 FLAGSHIPS • 8-12 NIGHT PASSAGES</p>
            </div>
            <Link href="/voyages/" className="text-amber-400 hover:text-amber-300 font-bold text-sm flex items-center gap-1 transition">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {voyages.map((voyage) => (
              <div
                key={voyage.id}
                onClick={() => selectVoyage(voyage.id)}
                className="group cursor-pointer relative bg-gradient-to-br from-[#1b2b48] to-[#141f33] border-2 border-amber-500/20 hover:border-amber-400/50 rounded-lg p-6 shadow-lg hover:shadow-amber-500/20 transition-all hover:-translate-y-1 transform"
              >
                {/* Tape Effect */}
                <div className="absolute -top-2 -left-4 w-12 h-8 bg-yellow-100/10 border border-yellow-400/30 rounded-sm -rotate-12 opacity-60" />

                {/* Vessel Icon */}
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-400/30 rounded-lg flex items-center justify-center mb-4">
                  <Ship className="w-6 h-6 text-amber-400" />
                </div>

                <h3 className="font-serif font-black text-lg text-white mb-1">{voyage.vessel}</h3>
                <p className="text-amber-300 text-xs font-mono mb-3">{voyage.code}</p>

                <p className="text-zinc-300 text-sm mb-4">{voyage.title}</p>

                <div className="space-y-2 text-xs text-zinc-400 font-mono mb-4">
                  <div className="flex justify-between">
                    <span>ROUTE:</span>
                    <span className="text-white">{voyage.departurePort} → {voyage.arrivalPort}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DURATION:</span>
                    <span className="text-white">{voyage.durationNights} NIGHTS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STARTING:</span>
                    <span className="text-amber-300">${voyage.startingPriceUSD.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-sm rounded-lg hover:bg-amber-500/30 transition-colors">
                  VIEW PASSAGE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region Filter - Collage Ephemera Buttons */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-black font-serif text-white mb-2">VOYAGE REGIONS</h2>
            <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest">SELECT DESTINATION</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                className={`relative p-4 rounded-lg font-serif font-black text-sm transition-all transform ${
                  selectedRegion === region.id
                    ? `bg-gradient-to-br ${region.color} text-black shadow-lg -rotate-1 scale-105`
                    : 'bg-[#141f33] border border-zinc-600 text-white hover:border-zinc-400'
                }`}
              >
                <div className="text-2xl mb-1">{region.icon}</div>
                <div className="text-xs uppercase tracking-widest">{region.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-2 border-amber-400/30 rounded-2xl p-8 sm:p-12 overflow-hidden">
            {/* Decorative Stamps */}
            <div className="absolute top-4 right-6 w-20 h-20 border-4 border-dashed border-amber-400/50 rounded-lg opacity-30 rotate-12" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-3 border-cyan-400/50 rounded-full opacity-20" />

            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-black text-white mb-3 flex items-center gap-2">
                <Anchor className="w-6 h-6 text-amber-400" />
                FLAGSHIP: RMS OCEANIC SOVEREIGN
              </h3>
              <p className="text-zinc-200 text-sm mb-6 max-w-2xl">
                Our crown jewel. 8-night transatlantic crossing with gala dinners, celestial navigation, and historic port-of-call adventures. Formal attire required for evening service.
              </p>
              <Link href="/voyages/" className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-serif font-black rounded-lg transition">
                BOOK NOW <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1b2b48] bg-[#05080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">
            TITAN #43 • CRUISELINE OS • MARITIME EPHEMERA COLLAGE VISUAL
          </p>
          <p className="text-zinc-600 text-xs">
            © 2026 Sovereign Cruiseline. Lloyd&apos;s A1 Classed. All Passages Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
