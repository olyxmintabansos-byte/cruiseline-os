import type { Metadata } from 'next';
import './globals.css';
import { CruiseProvider } from '@/context/CruiseContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Cruiseline OS — Transoceanic Voyage Operations & Collage Nautical Registry',
  description:
    'Titan #43: Luxury maritime cruise operations system, vintage voyage cards, collage ephemera, stateroom concierges, and captain logbook telemetry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#0b111e] text-[#f1f5f9]">
        <CruiseProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </CruiseProvider>
      </body>
    </html>
  );
}
