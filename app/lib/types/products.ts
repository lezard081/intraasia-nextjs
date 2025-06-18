export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: Category;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  categorySlug?: string;
  subcategory: string;
  subcategorySlug?: string;
  definition: string;
  features: string[];
  dateAdded: string; // ISO date string format
  brand: string; // Brand name
}

export type SortOption =
  | 'alphabetical-asc'
  | 'alphabetical-desc'
  | 'newest'
  | 'oldest'
  | 'brand-asc'
  | 'brand-desc';
