'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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

const categories = [
    {
        section: 'Section 1',
        items: ['Item 1', 'Item 2', 'Item 3']
    },
    {
        section: 'Section 2',
        items: ['Item 4', 'Item 5', 'Item 6']
    },
    {
        section: 'Section 3',
        items: ['Item 7', 'Item 8', 'Item 9']
    }
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex flex-row items-center justify-end space-x-4 md:space-x-6">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                        "px-2 py-1 text-sm rounded-sm md:text-base font-normal transition-colors hover:text-blue-600 hover:bg-sky-400 hover:border-white hover:border-2",
                        {
                            "text-blue-800 font-semibold":pathname === link.href,
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
