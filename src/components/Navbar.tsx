'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anchor, Compass, Ship, BookOpen, Layers, BookmarkCheck } from 'lucide-react';
import { useCruise } from '@/context/CruiseContext';

export function Navbar() {
  const pathname = usePathname();
  const { bookings } = useCruise();

  const links = [
    { href: '/', label: 'FLEET COLLAGE', sub: 'EXPEDITION SHIPS' },
    { href: '/voyages/', label: 'ITINERARIES', sub: 'PORTS & VOYAGES' },
    { href: '/staterooms/', label: 'STATEROOMS', sub: 'PENTHOUSE SUITES' },
    { href: '/logbook/', label: 'CAPTAIN LOG', sub: 'NAVIGATION TELEMETRY' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080d17]/95 backdrop-blur-md border-b border-[#1b2b48]">
      {/* Nautical Ticker Ribbon */}
      <div className="bg-[#05080e] border-b border-[#141f33] px-4 py-1 text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Anchor className="w-3.5 h-3.5" />
            <span>TRANSOCEANIC MARITIME REGISTRY // LLOYD&apos;S A1 CLASSED</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-300">
            FLAGSHIP: <strong className="text-white">RMS OCEANIC SOVEREIGN</strong> • BEAUFORT FORCE 4 (MODERATE BREEZE)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-amber-300 flex items-center gap-1">
            <BookmarkCheck className="w-3 h-3" />
            <span>RESERVATIONS: {bookings.length} LOCKED</span>
          </span>
          <span className="text-zinc-500">TITAN #43 // STYLE #25 COLLAGE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Collage Vintage Stamp Logo */}
            <div className="relative w-11 h-11 bg-[#0f172a] border-2 border-amber-500/50 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-2 transition-transform">
              <Ship className="w-6 h-6 text-amber-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border border-black" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-2 font-serif">
                SOVEREIGN <span className="text-amber-400">CRUISELINE</span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                TRANSOCEANIC MARITIME EPHEMERA
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl transition-all flex flex-col items-center ${
                    active
                      ? 'bg-[#1b2b48] text-amber-300 shadow-md border border-amber-500/30 -rotate-1'
                      : 'text-zinc-300 hover:text-white hover:bg-[#121b2d]'
                  }`}
                >
                  <span className="text-xs font-bold tracking-wide font-serif">{item.label}</span>
                  <span className="text-[9px] font-mono text-zinc-400">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Book CTA */}
          <Link
            href="/voyages/"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-black animate-spin-slow" />
            <span>BOOK PASSAGE</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
