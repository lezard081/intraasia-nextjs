'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { products } from '@/app/lib/data/products';

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
function getCategoriesFromProducts() {
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

    const dynamicCategories = getCategoriesFromProducts();

    return (
        <div className="flex items-center space-x-6">
            {links.map((link) => (
                <Link
                    key={link.href}
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
            ))}
            {/* Categories Dropdown */}
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
                    <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#1a2332] rounded shadow-lg z-20 py-2 border border-gray-200 dark:border-[#22304a]">
                        {dynamicCategories.map((cat) => (
                            <div key={cat.section} className="mb-2 last:mb-0">
                                <div className="px-4 py-2 text-xs font-bold text-[#0054A6] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-[#14213d] rounded">
                                    {cat.section.charAt(0).toUpperCase() + cat.section.slice(1)}
                                </div>
                                {cat.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={clsx(
                                            "block px-4 py-2 text-sm transition-colors",
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
