'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory, sortProducts } from '@/app/lib/data/products';
import { Product, SortOption } from '@/app/lib/types/products';
import { cn } from '@/app/lib/utils';

export default function ProductsPage() {
  const params = useParams();
  const category = params.category as string;
  const subcategory = params.subcategory as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProducts = () => {
      setIsLoading(true);
      try {
        const fetchedProducts = getProductsByCategory(category, subcategory);
        const sortedProducts = sortProducts(fetchedProducts, sortOption);
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, sortOption]);

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  // Format category and subcategory for display
  const formatText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryDisplay = formatText(category);
  const subcategoryDisplay = formatText(subcategory);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative w-full h-[250px] bg-[#0054A6]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{subcategoryDisplay}</h1>
            <p className="text-lg">{categoryDisplay} Products</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Sorting Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleSortChange('alphabetical')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    sortOption === 'alphabetical'
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  A-Z
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    sortOption === 'newest'
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSortChange('oldest')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    sortOption === 'oldest'
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* No Products Found */}
          {!isLoading && products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No products found</h3>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link 
                  href={`/products/${product.id}`} 
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      {/* Placeholder for missing images */}
                      <span>Product Image</span>
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Hide the image on error, showing the placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(product.dateAdded).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium text-blue-600">View Details</span>
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