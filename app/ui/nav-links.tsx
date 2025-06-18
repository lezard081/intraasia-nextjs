// @ts-nocheck
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { getProducts } from '@/app/lib/data-client';
import { Product } from '@/app/lib/types/products';

const links = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
]

// Helper to get categories and subcategories from products data
type CategoryMap = Record<string, Set<string>>;
async function getCategoriesFromProducts() {
    const products = await getProducts();
    const map: CategoryMap = {};
    products.forEach((p) => {
        if (!map[p.category]) map[p.category] = new Set();
        map[p.category].add(p.subcategory);
    });
    // Convert to array of { section, items }
    return Object.entries(map).map(([section, subSet]) => ({
        section,
        items: Array.from(subSet).map(sub => ({
            name: sub
                .split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' '),
            href: `/categories/${section}/${sub}`
        }))
    }));
}

export default function NavLinks() {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dynamicCategories, setDynamicCategories] = useState<Array<{
        section: string;
        items: Array<{ name: string; href: string }>;
    }>>([]);
    const [loading, setLoading] = useState(true);

    // Load categories data
    useEffect(() => {
        async function loadCategories() {
            try {
                const categories = await getCategoriesFromProducts();
                setDynamicCategories(categories);
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center space-x-6">
            {links.map((link, idx) => (
                // Insert Categories dropdown after About (idx === 1)
                <React.Fragment key={link.href}>
                    <Link
                        href={link.href}
                        className={clsx(
                            "transition-colors duration-200 text-base font-medium",
                            pathname === link.href
                                ? "text-[#0054A6] dark:text-blue-400 border-b-2 border-[#0054A6] dark:border-blue-400"
                                : "text-gray-700 dark:text-gray-100 hover:text-[#0054A6] dark:hover:text-blue-400 hover:border-b-2 hover:border-[#0054A6] dark:hover:border-blue-400 border-b-2 border-transparent"
                        )}
                    >
                        {link.label}
                    </Link>
                    {idx === 1 && (
                        // Categories Megamenu
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen((open) => !open)}
                                className={clsx(
                                    "transition-colors duration-200 text-base font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#22304a]",
                                    isDropdownOpen
                                        ? "text-[#0054A6] dark:text-blue-400"
                                        : "text-gray-700 dark:text-gray-100"
                                )}
                            >
                                Categories
                                <svg className={clsx("w-4 h-4 transition-transform", isDropdownOpen ? "rotate-180" : "rotate-0")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="fixed left-0 right-0 top-20 z-30 w-full bg-white dark:bg-[#1a2332] border-t border-b border-gray-200 dark:border-[#22304a] shadow-lg py-8 px-8 flex flex-wrap gap-8 justify-center"
                                    style={{minHeight: '220px'}}
                                >
                                    {loading ? (
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Loading categories...
                                        </div>
                                    ) : dynamicCategories.length === 0 ? (
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            No categories found
                                        </div>
                                    ) : (
                                        dynamicCategories.map((cat) => (
                                            <div key={cat.section} className="min-w-[180px] max-w-xs">
                                                <div className="mb-2 text-base font-bold text-[#0054A6] dark:text-blue-400 uppercase tracking-wider">
                                                    {cat.section.charAt(0).toUpperCase() + cat.section.slice(1)}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    {cat.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className={clsx(
                                                                "block px-2 py-1 rounded text-sm transition-colors",
                                                                pathname === item.href
                                                                    ? "text-[#0054A6] dark:text-blue-400 bg-gray-100 dark:bg-[#22304a] font-semibold"
                                                                    : "text-gray-700 dark:text-gray-100 hover:text-[#0054A6] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-[#22304a]"
                                                            )}
                                                            onClick={() => setIsDropdownOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
