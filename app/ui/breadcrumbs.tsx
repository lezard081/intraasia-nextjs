// @ts-nocheck
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="bg-gray-100 py-3 px-4 md:px-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, idx) => (
          <React.Fragment key={item.label + '-' + idx}>
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-blue-600">{item.label}</Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </li>
            {idx < items.length - 1 && <li key={"sep-" + idx}>/</li>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
