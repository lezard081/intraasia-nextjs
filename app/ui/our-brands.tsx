// @ts-nocheck
'use client';
import Image from 'next/image';

const logos = [
  'braun logo.png',
  'electrolux-logo.png',
  'giorik-logo.jpg',
  'hobart-logo.png',
  'jensen-logo.png',
  'pony-logo.png',
  'primus-logo.png',
  'renzacci-logo.png',
  'sammic-logo.png',
  'union-logo.png',
];

export default function OurBrands() {
  return (
    <section className="py-12 w-full bg-white">
      <div className="w-full max-w-none px-0">
        <div className="flex items-center justify-center mb-8">
          <span className="relative inline-block w-full">
            <span className="block w-full text-2xl font-bold text-center px-8 py-3 bg-[#0054A6] text-white rounded-none shadow-lg z-10 relative">
              Our Brands
            </span>
            <span className="absolute left-1/4 right-1/4 bottom-0 h-1 bg-yellow-400 rounded-b-lg z-0" style={{height: '8px', bottom: '-8px'}}></span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
          {logos.map((logo) => (
            <div key={logo} className="flex items-center justify-center p-2 bg-gray-50 rounded shadow-sm">
              <Image
                src={`/brand-logos/${logo}`}
                alt={logo.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
                width={120}
                height={60}
                className="object-contain h-16 w-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
