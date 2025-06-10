'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory, products } from '@/app/lib/data/products';
import { Product } from '@/app/lib/types/products';
import { useEffect, useState } from 'react';

// Dynamically generate subcategories from products data
function getSubcategories(category: string) {
  const subMap: Record<string, { name: string; slug: string; description: string; image: string }> = {};
  products.forEach((p) => {
    if (p.category === category) {
      if (!subMap[p.subcategory]) {
        subMap[p.subcategory] = {
          name: p.subcategory
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' '),
          slug: p.subcategory,
          description: p.definition,
          image: p.image,
        };
      }
    }
  });
  return Object.values(subMap);
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Get product counts for each subcategory
    const counts: Record<string, number> = {};
    
    if (getSubcategories(category as string)) {
      getSubcategories(category as string).forEach(subcat => {
        const products = getProductsByCategory(category, subcat.slug);
        counts[subcat.slug] = products.length;
      });
    }
    
    setProductCounts(counts);
  }, [category]);

  // Format category for display
  const formatText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryDisplay = formatText(category);
  const subcategories = getSubcategories(category);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative w-full h-[250px] bg-[#0054A6]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryDisplay} Products</h1>
            <p className="text-lg">Browse our selection of {categoryDisplay.toLowerCase()} equipment</p>
          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Browse {categoryDisplay} Categories</h2>
          
          {subcategories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No categories found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((subcategory) => (
                <Link 
                  href={`/categories/${category}/${subcategory.slug}`} 
                  key={subcategory.slug}
                  className="group bg-white dark:bg-[#1a2332] rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl border-2 border-[#0054A6] dark:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                >
                  <div className="relative h-52 bg-gray-200 dark:bg-[#22304a]">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-100">
                      {/* Placeholder for missing images */}
                      <span>Category Image</span>
                    </div>
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Hide the image on error, showing the placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
                      <h3 className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide uppercase group-hover:text-blue-200 transition-colors">{subcategory.name}</h3>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-[#1a2332]">
                    <p className="text-gray-700 dark:text-gray-200 mb-3 text-base font-medium line-clamp-2">{subcategory.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {productCounts[subcategory.slug] || 0} Products
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wide group-hover:underline">View All</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}