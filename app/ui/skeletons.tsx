import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ minHeight: 80 }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2332] overflow-hidden">
      <div className="h-52 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-6">
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function SubcategoryCardSkeleton() {
  return (
    <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2332] overflow-hidden">
      <div className="h-52 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-6">
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

