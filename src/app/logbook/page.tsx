'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Navigation,
  TrendingUp,
  Wind,
  Gauge,
  Radio,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useCruise } from '@/context/CruiseContext';

export default function LogbookPage() {
  const { voyages, activeVoyage, selectVoyage } = useCruise();
  const [expandedPort, setExpandedPort] = useState<number | null>(0);

  // Simulated telemetry data
  const telemetry = {
    courseTrue: 87,
    courseRaw: 89,
    speedKnots: 18.5,
    windForce: 4,
    windDirection: 245,
    seaState: 'MODERATE',
    visibility: 12,
    barometricPressure: 1013.2,
    waterTemp: 14.2,
    captainNotes: 'Excellent crossing conditions. Smooth seas ahead of thermal ridge.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b111e] via-[#0f1628] to-[#080d17]">
      {/* Header */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#1b2b48]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black font-serif text-white mb-4">
            CAPTAIN'S <span className="text-cyan-400">LOGBOOK</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Real-time maritime telemetry, navigation data, and captain's operational notes from the bridge.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Voyage Selection */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-[#0f1628] border-2 border-cyan-400/20 rounded-xl p-6">
                  <h3 className="text-lg font-serif font-black text-white mb-4 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-cyan-400" />
                    ACTIVE VOYAGE
                  </h3>
                  <div className="space-y-2">
                    {voyages.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => selectVoyage(v.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeVoyage?.id === v.id
                            ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold'
                            : 'bg-[#141f33] border border-zinc-700 text-zinc-300 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="font-mono text-xs text-zinc-500">{v.code}</div>
                        <div className="text-sm font-bold">{v.vessel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Signal Status */}
                <div className="bg-[#0f1628] border-2 border-emerald-400/20 rounded-xl p-6">
                  <h4 className="text-sm font-serif font-black text-white mb-3 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    COMMUNICATION
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Satellite Link</span>
                      <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">GMDSS Radio</span>
                      <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">AIS Transmit</span>
                      <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Telemetry & Logs */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Navigation Telemetry */}
              <div className="bg-gradient-to-br from-[#0f1628] to-[#141f33] border-2 border-cyan-400/30 rounded-xl p-8">
                <h2 className="text-2xl font-serif font-black text-white mb-6 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-cyan-400" />
                  CURRENT NAVIGATION
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'COURSE TRUE', value: `${telemetry.courseTrue}°`, icon: Compass },
                    { label: 'COURSE RAW', value: `${telemetry.courseRaw}°`, icon: Navigation },
                    { label: 'SPEED', value: `${telemetry.speedKnots} kts`, icon: TrendingUp },
                    { label: 'WIND FORCE', value: `BF ${telemetry.windForce}`, icon: Wind },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#1b2b48] border border-cyan-400/20 rounded-lg">
                      <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">{item.label}</p>
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Wind Direction', value: `${telemetry.windDirection}°` },
                    { label: 'Sea State', value: telemetry.seaState },
                    { label: 'Visibility', value: `${telemetry.visibility} nm` },
                    { label: 'Pressure', value: `${telemetry.barometricPressure} mb` },
                    { label: 'Water Temp', value: `${telemetry.waterTemp}°C` },
                    { label: 'Report Time', value: new Date().toLocaleTimeString() },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#1b2b48] border border-zinc-700 rounded-lg">
                      <p className="text-xs text-zinc-400 font-mono mb-1">{item.label}</p>
                      <p className="font-bold text-cyan-300">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Captain's Notes */}
              <div className="bg-[#0f1628] border-2 border-amber-400/20 rounded-xl p-8">
                <h3 className="text-xl font-serif font-black text-white mb-4">CAPTAIN'S OPERATIONAL NOTES</h3>
                <div className="p-6 bg-[#1b2b48] border-l-4 border-amber-400 rounded-lg">
                  <p className="text-zinc-200 font-serif italic leading-relaxed">
                    "{telemetry.captainNotes}"
                  </p>
                  <p className="text-xs text-zinc-500 font-mono mt-4">
                    — Captain J. Hartwell, RMS Oceanic Sovereign • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Detailed Itinerary with Telemetry */}
              {activeVoyage && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-black text-white mb-4">DETAILED PASSAGE PLAN</h3>

                  {activeVoyage.ports.map((port, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedPort(expandedPort === idx ? null : idx)}
                      className="cursor-pointer group"
                    >
                      <div className="bg-[#0f1628] border-2 border-zinc-700 hover:border-cyan-400/50 rounded-lg p-4 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-serif font-black text-white">Day {port.day}: {port.port}</p>
                            <p className="text-xs text-zinc-400 font-mono">{port.country}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-cyan-300">{port.arriveTime}</p>
                            <p className="text-xs text-zinc-500">{port.departTime}</p>
                          </div>
                        </div>

                        {expandedPort === idx && (
                          <div className="mt-4 pt-4 border-t border-zinc-700">
                            <p className="text-sm text-zinc-200 mb-3">{port.activity}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2 bg-[#1b2b48] border border-zinc-700 rounded">
                                <span className="text-zinc-400">Est. Wind:</span>
                                <span className="text-zinc-200 ml-1">BF {Math.floor(Math.random() * 5)}</span>
                              </div>
                              <div className="p-2 bg-[#1b2b48] border border-zinc-700 rounded">
                                <span className="text-zinc-400">Swell Height:</span>
                                <span className="text-zinc-200 ml-1">2-3 m</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Safety Briefing */}
              <div className="bg-[#0f1628] border-2 border-amber-500/30 rounded-xl p-6">
                <h4 className="font-serif font-black text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  MARITIME SAFETY ADVISORY
                </h4>
                <p className="text-sm text-zinc-300">
                  All passengers must review muster station assignments upon embarkation. Life jacket drills mandatory within 4 hours of departure. Bridge is closed to passengers underway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1b2b48] bg-[#05080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-mono uppercase">MARITIME DATA LIVE STREAM • UPDATED EVERY 60 SECONDS</p>
        </div>
      </footer>
    </div>
  );
}
