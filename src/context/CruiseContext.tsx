'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Voyage, CruiseBooking, CruiseContextType } from '@/types/cruise';

const SEED_VOYAGES: Voyage[] = [
  {
    id: 'voy-01',
    code: 'SOV-701',
    title: 'The Royal Transatlantic Crossing',
    vessel: 'RMS Oceanic Sovereign',
    region: 'TRANSATLANTIC',
    durationNights: 8,
    departurePort: 'Southampton (UK)',
    arrivalPort: 'New York (USA)',
    departureDate: '14 Oct 2026',
    startingPriceUSD: 3850,
    availableCabins: 14,
    highlights: ['Formal Gala Dinner in Grand Saloon', 'Celestial Star-Gazing on Nav Deck', 'Orchestral Ballroom Evenings'],
    ports: [
      { day: 1, port: 'Southampton', country: 'United Kingdom', arriveTime: 'EMBARK 12:00', departTime: '17:00', activity: 'Champagne Bon Voyage Deck Party' },
      { day: 2, port: 'At Sea (Celtic Shelf)', country: 'International Waters', arriveTime: '—', departTime: '—', activity: 'Captain Bridge Lecture & High Tea' },
      { day: 3, port: 'Cherbourg', country: 'France', arriveTime: '08:00', departTime: '18:00', activity: 'Normandy Maritime Museum Tour' },
      { day: 4, port: 'At Sea (Mid-Atlantic)', country: 'International Waters', arriveTime: '—', departTime: '—', activity: 'Black-Tie Commodore Dinner' },
      { day: 5, port: 'At Sea (Grand Banks)', country: 'International Waters', arriveTime: '—', departTime: '—', activity: 'Maritime Sextant Workshop' },
      { day: 6, port: 'Halifax', country: 'Canada', arriveTime: '09:00', departTime: '16:00', activity: 'Historic Citadel & Waterfront Stroll' },
      { day: 7, port: 'At Sea (Nantucket Shoals)', country: 'International Waters', arriveTime: '—', departTime: '—', activity: 'Farewell Gala & Masquerade' },
      { day: 8, port: 'New York Harbor', country: 'United States', arriveTime: '06:30', departTime: 'DISEMBARK', activity: 'Statue of Liberty Sunrise Parade' },
    ],
  },
  {
    id: 'voy-02',
    code: 'MED-412',
    title: 'Odyssey of the Aegean Emperors',
    vessel: 'SS Athenian Grace',
    region: 'MEDITERRANEAN',
    durationNights: 10,
    departurePort: 'Venice (Italy)',
    arrivalPort: 'Athens (Piraeus, Greece)',
    departureDate: '22 Oct 2026',
    startingPriceUSD: 4200,
    availableCabins: 8,
    highlights: ['Santorini Sunset Caldera Sail', 'Dubrovnik Old City Bastion Access', 'Vintage Wine Pairing Dinners'],
    ports: [
      { day: 1, port: 'Venice', country: 'Italy', arriveTime: 'EMBARK 14:00', departTime: '18:00', activity: 'Sail-away past San Marco Lagoon' },
      { day: 2, port: 'Dubrovnik', country: 'Croatia', arriveTime: '09:00', departTime: '19:00', activity: 'Ancient City Walls Expedition' },
      { day: 3, port: 'Kotor', country: 'Montenegro', arriveTime: '07:30', departTime: '16:00', activity: 'Fjord Navigation & Venetian Palaces' },
      { day: 4, port: 'Corfu', country: 'Greece', arriveTime: '08:00', departTime: '18:00', activity: 'Achilleion Imperial Palace Visit' },
      { day: 5, port: 'Santorini (Thira)', country: 'Greece', arriveTime: '08:00', departTime: '21:00', activity: 'Oia Blue Dome Cliffwalk & Wine Tasting' },
      { day: 6, port: 'Rhodes', country: 'Greece', arriveTime: '07:00', departTime: '18:00', activity: 'Knights Hospitaller Fortress' },
      { day: 7, port: 'Mykonos', country: 'Greece', arriveTime: '08:00', departTime: '23:00', activity: 'Little Venice Sunset Cocktails' },
      { day: 8, port: 'Athens (Piraeus)', country: 'Greece', arriveTime: '06:00', departTime: 'DISEMBARK', activity: 'Parthenon & Acropolis Excursion' },
    ],
  },
  {
    id: 'voy-03',
    code: 'ICE-905',
    title: 'Antarctica Glacial Expedition',
    vessel: 'MV Polar Sovereign Explorer',
    region: 'ANTARCTIC_EXPEDITION',
    durationNights: 12,
    departurePort: 'Ushuaia (Argentina)',
    arrivalPort: 'Ushuaia (Argentina)',
    departureDate: '05 Nov 2026',
    startingPriceUSD: 8900,
    availableCabins: 5,
    highlights: ['Zodiac Iceberg Landings', 'Gentoo Penguin Colonies', 'Drake Passage Navigation Badge'],
    ports: [
      { day: 1, port: 'Ushuaia', country: 'Argentina', arriveTime: 'EMBARK 15:00', departTime: '18:00', activity: 'Beagle Channel Departure' },
      { day: 2, port: 'Drake Passage (Southbound)', country: 'Southern Ocean', arriveTime: '—', departTime: '—', activity: 'Glaciology & Seabird Lectures' },
      { day: 3, port: 'Drake Passage', country: 'Southern Ocean', arriveTime: '—', departTime: '—', activity: 'Ice Radar Navigation Briefing' },
      { day: 4, port: 'South Shetland Islands', country: 'Antarctica', arriveTime: '07:00', departTime: '18:00', activity: 'King George Island Zodiac Landing' },
      { day: 5, port: 'Gerlache Strait & Neko Hbr', country: 'Antarctic Peninsula', arriveTime: '06:00', departTime: '19:00', activity: 'Continental Ice Sheet Footstep' },
      { day: 6, port: 'Lemaire Channel', country: 'Antarctica', arriveTime: '08:00', departTime: '17:00', activity: 'Kodak Gap Glacial Cruise' },
      { day: 7, port: 'Deception Island', country: 'Antarctica', arriveTime: '09:00', departTime: '16:00', activity: 'Volcanic Caldera Geothermal Dip' },
      { day: 8, port: 'Drake Passage (Northbound)', country: 'Southern Ocean', arriveTime: '—', departTime: '—', activity: 'Expedition Photographic Review' },
    ],
  },
];

const LOCAL_STORAGE_KEY = 'cruiseline_os_state_v1';

const CruiseContext = createContext<CruiseContextType | undefined>(undefined);

export function CruiseProvider({ children }: { children: React.ReactNode }) {
  const [voyages] = useState<Voyage[]>(SEED_VOYAGES);
  const [activeVoyage, setActiveVoyage] = useState<Voyage | null>(SEED_VOYAGES[0]);
  const [bookings, setBookings] = useState<CruiseBooking[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.bookings) setBookings(parsed.bookings);
      }
    } catch {}
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ bookings }));
    } catch {}
  }, [bookings]);

  const selectVoyage = (id: string) => {
    const found = voyages.find((v) => v.id === id);
    if (found) setActiveVoyage(found);
  };

  const createBooking = (bookingData: Omit<CruiseBooking, 'id' | 'bookingDate'>) => {
    const newBooking: CruiseBooking = {
      ...bookingData,
      id: `CRZ-${Math.floor(1000 + Math.random() * 9000)}-PASS`,
      bookingDate: new Date().toLocaleDateString('en-GB'),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <CruiseContext.Provider
      value={{
        voyages,
        bookings,
        activeVoyage,
        selectVoyage,
        createBooking,
      }}
    >
      {children}
    </CruiseContext.Provider>
  );
}

export function useCruise() {
  const context = useContext(CruiseContext);
  if (!context) throw new Error('useCruise must be used within CruiseProvider');
  return context;
}
