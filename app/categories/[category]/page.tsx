'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory } from '@/app/lib/data/products';
import { Product } from '@/app/lib/types/products';
import { useEffect, useState } from 'react';

// This would typically come from a database or API
const subcategoryInfo = {
  kitchen: [
    { 
      name: 'Commercial Ovens', 
      slug: 'ovens', 
      description: 'High-quality commercial ovens for professional kitchens',
      image: '/product-images/ovens/category-cover.jpg'
    },
    { 
      name: 'Refrigeration', 
      slug: 'refrigeration', 
      description: 'Commercial refrigeration solutions for food storage',
      image: '/product-images/refrigeration/category-cover.jpg'
    },
    { 
      name: 'Food Processors', 
      slug: 'food-processors', 
      description: 'Professional food processing equipment for commercial kitchens',
      image: '/product-images/food-processors/category-cover.jpg'
    }
  ],
  laundry: [
    { 
      name: 'Washing Machines', 
      slug: 'washing-machines', 
      description: 'Industrial washing machines for commercial laundry operations',
      image: '/product-images/washing-machines/category-cover.jpg'
    },
    { 
      name: 'Dryers', 
      slug: 'dryers', 
      description: 'Commercial dryers for efficient laundry processing',
      image: '/product-images/dryers/category-cover.jpg'
    },
    { 
      name: 'Ironing Equipment', 
      slug: 'ironing', 
      description: 'Professional ironing and pressing equipment for commercial use',
      image: '/product-images/ironing/category-cover.jpg'
    }
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Get product counts for each subcategory
    const counts: Record<string, number> = {};
    
    if (subcategoryInfo[category as keyof typeof subcategoryInfo]) {
      subcategoryInfo[category as keyof typeof subcategoryInfo].forEach(subcat => {
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
  const subcategories = subcategoryInfo[category as keyof typeof subcategoryInfo] || [];

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
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      {/* Placeholder for missing images */}
                      <span>Category Image</span>
                    </div>
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Hide the image on error, showing the placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white">{subcategory.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-2">{subcategory.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {productCounts[subcategory.slug] || 0} Products
                      </span>
                      <span className="text-sm font-medium text-blue-600">View All</span>
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