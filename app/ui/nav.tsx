'use client';

import Link from 'next/link';
import IntraAsiaLogo from './intra-asia-logo';
import Navlinks from './nav-links';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getProducts } from '@/app/lib/data-client';

export default function Nav() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Helper to get categories and subcategories from products data
    async function getCategoriesFromProducts() {
        const products = await getProducts();
        const map = {};
        products.forEach((p) => {
            if (!map[p.category]) map[p.category] = new Set();
            map[p.category].add(p.subcategory);
        });
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

    return (
        <nav className="relative bg-white shadow-lg dark:text-black dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-4">
                <Link href="/" className="z-10">
                    <IntraAsiaLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex grow justify-end">
                    <Navlinks />
                </div>

                {/* Hamburger Menu Button */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-20"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span 
                        className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out ${
                            isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                        }`}
                    ></span>
                    <span 
                        className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ease-in-out ${
                            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    ></span>
                    <span 
                        className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out ${
                            isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                        }`}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#101c2c] shadow-lg transition-transform duration-300 ease-in-out z-10 ${
                    isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="px-4 py-4">
                    <ul className="space-y-4">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href}
                                    className={`block px-2 py-2 text-base ${
                                        pathname === link.href ? 'text-blue-800 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-100'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <span className="block px-2 py-2 text-base font-semibold text-gray-800 dark:text-blue-400 uppercase tracking-wide">Categories</span>
                            <ul className="pl-2 space-y-2 mt-2">
                                {loading ? (
                                    <li className="px-2 py-2 text-sm text-gray-600 dark:text-gray-300">
                                        Loading categories...
                                    </li>
                                ) : dynamicCategories.length === 0 ? (
                                    <li className="px-2 py-2 text-sm text-gray-600 dark:text-gray-300">
                                        No categories found
                                    </li>
                                ) : (
                                    dynamicCategories.map((cat) => (
                                        <li key={cat.section}>
                                            <span className="block px-2 py-1 text-sm font-bold text-[#0054A6] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-[#14213d] rounded mb-1">{cat.section.charAt(0).toUpperCase() + cat.section.slice(1)}</span>
                                            <ul className="pl-4 space-y-1 mt-1">
                                                {cat.items.map((item) => (
                                                    <li key={item.href}>
                                                        <Link href={item.href} className={`block px-2 py-1 text-sm rounded transition-colors ${
                                                            pathname === item.href
                                                                ? 'text-[#0054A6] dark:text-blue-400 bg-gray-100 dark:bg-[#22304a] font-semibold'
                                                                : 'text-gray-600 dark:text-gray-100 hover:text-[#0054A6] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-[#22304a]'
                                                        }`}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
