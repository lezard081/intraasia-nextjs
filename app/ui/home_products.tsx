"use client";

import Link from "next/link";
import { fetchProducts } from "@/app/lib/data";
import { useRef, useEffect, useState } from "react";
import { Product } from "@/app/lib/types/products";

export default function HomeProducts() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from the database
  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Animation observer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).getAttribute('data-idx'));
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add(idx % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right");
          }
        });
      },
      { threshold: 0.2 }
    );
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [products]);

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {Array.from(new Set(products.map(p => p.category))).map((category, idx) => {
              const firstProduct = products.find(p => p.category === category);
              return (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  ref={el => { cardsRef.current[idx] = el; }}
                  data-idx={idx}
                  className="opacity-0 relative flex-1 min-h-[220px] h-64 rounded-2xl overflow-hidden shadow-lg group transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0054A6]"
                  style={{ backgroundImage: firstProduct?.image ? `url(${firstProduct.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-[#0054A6]/70 group-hover:bg-[#0054A6]/60 transition-colors"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-white">
                    <span className="text-3xl font-bold capitalize mb-2 drop-shadow-lg">{category.replace(/-/g, ' ')}</span>
                    <span className="text-lg drop-shadow">{products.filter(p => p.category === category).length} Products</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
