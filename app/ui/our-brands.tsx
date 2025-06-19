'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function OurBrands() {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const res = await fetch('/api/images?folder=brand-logos');
        if (!res.ok) throw new Error('Failed to fetch brand logos');
        const data = await res.json();
        setLogos(Array.isArray(data.images) ? data.images : []);
      } catch (e) {
        setLogos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLogos();
  }, []);

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
          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : (
            logos.map((logo) => (
              <div key={logo} className="flex items-center justify-center p-2 bg-gray-50 rounded shadow-sm">
                <Image
                  src={logo}
                  alt={logo.replace(/[-_]/g, ' ').replace(/^.*\//, '').replace(/\..+$/, '')}
                  width={120}
                  height={60}
                  className="object-contain h-16 w-auto"
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
