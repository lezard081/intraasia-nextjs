'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory } from '@/app/lib/data-client';
import { Product } from '@/app/lib/types/products';
import { useEffect, useState } from 'react';
import { Skeleton, SubcategoryCardSkeleton } from '@/app/ui/skeletons';
import PageTransition from '@/app/ui/PageTransition';
import AnimatedSection from '@/app/ui/AnimatedSection';

// Dynamically generate subcategories from products data
async function getSubcategories(category: string) {
  const products = await getProductsByCategory(category);
  console.log('Fetched products for category', category, ':', products);
  const subMap: Record<string, { name: string; slug: string; description: string; image: string }> = {};

  products.forEach((p) => {
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
  });

  return Object.values(subMap);
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [subcategories, setSubcategories] = useState<Array<{ name: string; slug: string; description: string; image: string }>>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<unknown>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setFetchError(null);
      try {
        // Get subcategories
        const subs = await getSubcategories(category);
        console.log('Fetched subcategories:', subs);
        setSubcategories(subs);

        // Get product counts for each subcategory
        const counts: Record<string, number> = {};

        for (const subcat of subs) {
          const products = await getProductsByCategory(category, subcat.slug);
          console.log(`Products for subcategory ${subcat.slug}:`, products);
          counts[subcat.slug] = products.length;
        }

        setProductCounts(counts);
      } catch (error) {
        console.error('Error loading category data:', error);
        setFetchError(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [category]);

  // Format category for display
  const formatText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryDisplay = formatText(category);

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Banner Section */}
        <AnimatedSection>
          <section className="relative w-full h-[250px] bg-[#0054A6]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryDisplay}</h1>
                <p className="text-lg">Browse our selection of {categoryDisplay.toLowerCase()}</p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Subcategories Section */}
        <AnimatedSection>
          <section className="w-full py-12 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
              <h2 className="text-2xl font-bold mb-8">Browse {categoryDisplay} Categories</h2>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SubcategoryCardSkeleton key={i} />
                  ))}
                </div>
              ) : fetchError ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-red-600">Error loading data: {String(fetchError)}</h3>
                </div>
              ) : subcategories.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-600">No categories found</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subcategories.map((subcategory, idx) => (
                    <React.Suspense key={subcategory.slug || idx} fallback={<SubcategoryCardSkeleton />}>
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
                              {productCounts[decodeURIComponent(subcategory.slug)] || 0} Products
                            </span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wide group-hover:underline">View All</span>
                          </div>
                        </div>
                      </Link>
                    </React.Suspense>
                  ))}
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </PageTransition>
  );
}
