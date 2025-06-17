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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Brands</h2>
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
