export type VoyageRegion = 'TRANSATLANTIC' | 'MEDITERRANEAN' | 'ANTARCTIC_EXPEDITION' | 'CARIBBEAN_ARCHIPELAGO' | 'NORDIC_FJORDS';

export interface PortOfCall {
  day: number;
  port: string;
  country: string;
  arriveTime: string;
  departTime: string;
  activity: string;
}

export interface Voyage {
  id: string;
  code: string;
  title: string;
  vessel: string;
  region: VoyageRegion;
  durationNights: number;
  departurePort: string;
  arrivalPort: string;
  departureDate: string;
  startingPriceUSD: number;
  availableCabins: number;
  ports: PortOfCall[];
  highlights: string[];
}

export interface CruiseBooking {
  id: string;
  voyageCode: string;
  voyageTitle: string;
  vessel: string;
  stateroomClass: string;
  leadGuest: string;
  guestsCount: number;
  totalCostUSD: number;
  bookingDate: string;
}

export interface CruiseContextType {
  voyages: Voyage[];
  bookings: CruiseBooking[];
  activeVoyage: Voyage | null;
  selectVoyage: (id: string) => void;
  createBooking: (booking: Omit<CruiseBooking, 'id' | 'bookingDate'>) => void;
}
