'use client';

import Link from 'next/link';
import IntraAsiaLogo from './intra-asia-logo';
import Navlinks from './nav-links';

import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-row items-center justify-between px-8 py-4 bg-white shadow-lg">
            <Link href="/">
                <IntraAsiaLogo />
            </Link>
            <div className="flex grow justify-end">
                <Navlinks />
            </div>
        </nav>
    )
}
