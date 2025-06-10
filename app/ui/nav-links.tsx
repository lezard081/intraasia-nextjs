'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

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

// This data structure is designed to be easily replaced with database data in the future
const categories = [
    {
        section: 'Kitchen',
        items: [
            { name: 'Commercial Ovens', href: '/categories/kitchen/ovens' },
            { name: 'Refrigeration', href: '/categories/kitchen/refrigeration' },
            { name: 'Food Processors', href: '/categories/kitchen/food-processors' }
        ]
    },
    {
        section: 'Laundry',
        items: [
            { name: 'Washing Machines', href: '/categories/laundry/washing-machines' },
            { name: 'Dryers', href: '/categories/laundry/dryers' },
            { name: 'Ironing Equipment', href: '/categories/laundry/ironing' }
        ]
    }
];

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

    return (
        <div className="flex flex-row items-center justify-end space-x-4 md:space-x-6">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={clsx(
                        "px-2 py-1 text-sm rounded-sm md:text-base font-normal transition-colors hover:text-blue-600 hover:bg-sky-400 hover:border-white hover:border-2 flex items-center",
                        {
                            "text-blue-800 font-semibold": pathname.startsWith('/categories'),
                            "text-gray-600": !pathname.startsWith('/categories'),
                        }
                    )}
                >
                    <span className="block">Categories</span>
                    <svg
                        className={`ml-1 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 py-2">
                        {categories.map((category, index) => (
                            <div key={index} className="px-4 py-2">
                                <h3 className="font-semibold text-gray-800 mb-1">{category.section}</h3>
                                <ul>
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <Link
                                                href={item.href}
                                                className="block px-2 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Regular Nav Links */}
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                        "px-2 py-1 text-sm rounded-sm md:text-base font-normal transition-colors hover:text-blue-600 hover:bg-sky-400 hover:border-white hover:border-2 hidden md:block",
                        {
                            "text-blue-800 font-semibold": pathname === link.href,
                            "text-gray-600": pathname !== link.href,
                        },
                    )}
                >
                    <span className="block"> {link.label} </span>
                </Link>
            ))}
        </div>
    )
}
