'use client';

import Link from 'next/link';
import IntraAsiaLogo from './intra-asia-logo';
import Navlinks from './nav-links';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav className="relative bg-white shadow-lg">
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
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-transform duration-300 ease-in-out z-10 ${
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
                                        pathname === link.href ? 'text-blue-800 font-semibold' : 'text-gray-600'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <span className="block px-2 py-2 text-base font-semibold text-gray-800">Categories</span>
                            <ul className="pl-4 space-y-2 mt-2">
                                <li>
                                    <span className="block px-2 py-1 text-sm font-medium text-gray-700">Kitchen</span>
                                    <ul className="pl-4 space-y-1 mt-1">
                                        <li>
                                            <Link href="/categories/kitchen/ovens" className="block px-2 py-1 text-sm text-gray-600">
                                                Commercial Ovens
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/categories/kitchen/refrigeration" className="block px-2 py-1 text-sm text-gray-600">
                                                Refrigeration
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/categories/kitchen/food-processors" className="block px-2 py-1 text-sm text-gray-600">
                                                Food Processors
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="mt-3">
                                    <span className="block px-2 py-1 text-sm font-medium text-gray-700">Laundry</span>
                                    <ul className="pl-4 space-y-1 mt-1">
                                        <li>
                                            <Link href="/categories/laundry/washing-machines" className="block px-2 py-1 text-sm text-gray-600">
                                                Washing Machines
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/categories/laundry/dryers" className="block px-2 py-1 text-sm text-gray-600">
                                                Dryers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/categories/laundry/ironing" className="block px-2 py-1 text-sm text-gray-600">
                                                Ironing Equipment
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
