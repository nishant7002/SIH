import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Meridian | AI Platform for Indian Artisans & Handicrafts',
  description:
    'Meridian connects India’s traditional karigars with global buyers while empowering artisans with AI-assisted fair price discovery, regional craft preservation, and direct market intelligence.',
  keywords: [
    'Meridian',
    'Indian Handicrafts',
    'Handmade Products',
    'Artisan Marketplace',
    'AI Fair Pricing',
    'SIH 2026',
    'Kutch Embroidery',
    'Madhubani Art',
    'Blue Pottery',
    'Dhokra Art'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FDFAF6] text-[#1F2421] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
