'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/app/lib/data-client';
import { Product } from '@/app/lib/types/products';
import { ProductCardSkeleton } from '@/app/ui/skeletons';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import ContactForm from '@/app/ui/contact-form';
import PageTransition from '@/app/ui/PageTransition';
import AnimatedSection from '@/app/ui/AnimatedSection';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product from the database
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const fetchedProduct = await getProductBySlug(productSlug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          // Product not found, could redirect to 404 page
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  // Format category and subcategory for display
  const formatText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleBackClick = () => {
    if (product) {
      router.push(`/categories/${product.category}/${product.subcategory}`);
    } else {
      router.back();
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Breadcrumb Navigation */}
        {product && (
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: formatText(product.category), href: `/categories/${product.category}` },
              { label: formatText(product.subcategory), href: `/categories/${product.category}/${product.subcategory}` },
              { label: product.name }
            ]}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Product Not Found */}
        {!isLoading && !product && (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Product Details */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            {isLoading ? (
              <ProductCardSkeleton />
            ) : !product ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">Product not found</h3>
              </div>
            ) : (
              <React.Suspense fallback={<ProductCardSkeleton />}>
                <>
                  {/* Product Content */}
                  <div className="container mx-auto px-4 md:px-8 max-w-6xl py-8 md:py-12">
                    <button
                      onClick={handleBackClick}
                      className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to {formatText(product.subcategory)}
                    </button>
                    <div className="flex flex-col md:flex-row gap-8">
                      <AnimatedSection direction="left" className="w-full md:w-1/2">
                        {/* Product Image */}
                        <div className="relative h-[300px] md:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            {/* Placeholder for missing images */}
                            <span>Product Image</span>
                          </div>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => {
                              // Hide the image on error, showing the placeholder
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </AnimatedSection>
                      <AnimatedSection direction="right" className="w-full md:w-1/2">
                        {/* Product Details */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <div className="mb-6">
                          <p className="text-sm text-gray-500">
                            Added on {new Date(product.dateAdded).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Brand: <span className="font-medium text-gray-700">{product.brand}</span>
                          </p>
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                          <h2 className="text-xl font-semibold mb-4">Definition</h2>
                          <p className="text-gray-700 mb-6">
                            {product.definition || 'No definition available.'}
                          </p>
                          <h2 className="text-xl font-semibold mb-2">Features</h2>
                          {product.features && product.features.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {product.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No features listed.</p>
                          )}
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                  {/* Contact Form Section */}
                  <section className="w-full py-12 bg-white border-t mt-12">
                    <div className="container mx-auto px-4 md:px-8 max-w-2xl">
                      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Us About This Product</h2>
                      <p className="text-gray-600 mb-8 text-center">
                        Have questions or want to inquire about{' '}
                        <span className="font-semibold">{product.name}</span>? Fill out the form below and our team will get back to you promptly.
                      </p>
                      <ContactForm defaultMessage={`Hi IntraAsia, I would like to know more about: ${product.name} Thanks!`} />
                    </div>
                  </section>
                </>
              </React.Suspense>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
