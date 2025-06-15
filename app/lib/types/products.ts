export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  definition: string;
  features: string[];
  dateAdded: string; // ISO date string format
  supplier: string; // New field for supplier name
  brand: string; // New field for brand name
}

export type SortOption = 'alphabetical' | 'newest' | 'oldest' | 'supplier';
