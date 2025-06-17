'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory, sortProducts } from '@/app/lib/data-client';
import { Product, SortOption } from '@/app/lib/types/products';
import { cn } from '@/app/lib/utils';
import { ProductCardSkeleton } from '@/app/ui/skeletons';

export default function ProductsPage() {
  const params = useParams();
  const category = params.category as string;
  const subcategory = params.subcategory as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProductsByCategory(category, subcategory);
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
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3 px-4 md:px-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/categories/${category}`} className="hover:text-blue-600">{categoryDisplay}</Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{subcategoryDisplay}</li>
        </ol>
      </nav>

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">{categoryDisplay} Products</h2>
            <div className="w-full md:w-auto flex justify-end">
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                value={sortOption}
                onChange={e => handleSortChange(e.target.value as SortOption)}
                className="block w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-[#1a2332] text-gray-700 dark:text-gray-100"
              >
                <option value="alphabetical">A-Z</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No products found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <React.Suspense key={product.id || idx} fallback={<ProductCardSkeleton />}>
                  <Link
                    href={`/products/${product.slug}`}
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
                      <p className="text-sm text-gray-600 mb-1">Supplier: <span className="font-medium text-gray-700">{product.supplier}</span></p>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">{product.definition}</p>
                      <span className="text-xs text-gray-400">Added {new Date(product.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </React.Suspense>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
