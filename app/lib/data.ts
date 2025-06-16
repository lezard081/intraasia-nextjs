import { createClient as createBrowserClient } from '@/app/lib/utils/supabase/client'
import { Product, SortOption } from '@/app/lib/types/products'

// Client-side functions (for use in Client Components)
export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
    const productsCopy = [...products];

    switch(sortOption) {
        case 'alphabetical':
            return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
        case 'newest':
            return productsCopy.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        case 'oldest':
            return productsCopy.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        case 'supplier':
            return productsCopy.sort((a, b) => a.supplier.localeCompare(b.supplier));
        default:
            return productsCopy;
    }
}

// Client-side data fetching functions
export async function fetchCategories() {
    const supabase = createBrowserClient()

    const { data, error } = await supabase
        .from('categories')
        .select('id, name')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}

export async function fetchSubcategories(categoryId?: number) {
    const supabase = createBrowserClient()

    let query = supabase
        .from('subcategories')
        .select('id, name, category_id')

    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching subcategories:', error)
        return []
    }

    return data
}

export async function fetchProducts() {
    const supabase = createBrowserClient()

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
            id,
            name,
            description,
            image,
            brand_id,
            subcategory_id,
            brands(id,name),
            subcategories(id,name,category_id,categories(id,name))
        `)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('product_features')
        .select(`
            product_id,
            feature_id,
            features(id, name)
        `)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const transformedProducts = products.map(product => {
        const features = productFeatures
            ? productFeatures
                .filter(pf => pf.product_id === product.id)
                .map(pf => pf.features.name)
            : [];

        const category = product.subcategories?.categories?.name || '';
        const subcategory = product.subcategories?.name || '';
        const brand = product.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category,
            subcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand,
            brand,
        } as Product;
    });

    return transformedProducts;
}

export async function fetchProductById(id: string) {
    const supabase = createBrowserClient()

    const { data: product, error: productError } = await supabase
        .from('products')
        .select(`
            id,
            name,
            description,
            image,
            brand_id,
            subcategory_id,
            brands(id,name),
            subcategories(id,name,category_id,categories(id,name))
        `)
        .eq('id', id)
        .single()

    if (productError) {
        console.error('Error fetching product:', productError)
        return null
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('product_features')
        .select(`
            product_id,
            feature_id,
            features(id, name)
        `)
        .eq('product_id', id)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const features = productFeatures
        ? productFeatures.map(pf => pf.features.name)
        : [];

    const category = product.subcategories?.categories?.name || '';
    const subcategory = product.subcategories?.name || '';
    const brand = product.brands?.name || 'Unknown';

    return {
        id: product.id.toString(),
        name: product.name,
        image: product.image || '/placeholder.jpg',
        category,
        subcategory,
        definition: product.description || '',
        features,
        dateAdded: new Date().toISOString(), // This would need to be added to the database
        supplier: brand,
        brand,
    } as Product;
}

export async function fetchProductsByCategory(category: string, subcategory?: string) {
    const supabase = createBrowserClient()

    // First get the category ID
    const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single()

    if (categoryError) {
        console.error('Error fetching category:', categoryError)
        return []
    }

    // Then get subcategories for this category
    let subcategoryQuery = supabase
        .from('subcategories')
        .select('id, name')
        .eq('category_id', categoryData.id)

    if (subcategory) {
        subcategoryQuery = subcategoryQuery.eq('name', subcategory)
    }

    const { data: subcategoryData, error: subcategoryError } = await subcategoryQuery

    if (subcategoryError || !subcategoryData.length) {
        console.error('Error fetching subcategories:', subcategoryError)
        return []
    }

    // Get subcategory IDs
    const subcategoryIds = subcategoryData.map(sub => sub.id)

    // Get products for these subcategories
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
            id,
            name,
            description,
            image,
            brand_id,
            subcategory_id,
            brands(id,name),
            subcategories(id,name,category_id,categories(id,name))
        `)
        .in('subcategory_id', subcategoryIds)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const productIds = products.map(p => p.id)
    const { data: productFeatures, error: featuresError } = await supabase
        .from('product_features')
        .select(`
            product_id,
            feature_id,
            features(id, name)
        `)
        .in('product_id', productIds)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const transformedProducts = products.map(product => {
        const features = productFeatures
            ? productFeatures
                .filter(pf => pf.product_id === product.id)
                .map(pf => pf.features.name)
            : [];

        const category = product.subcategories?.categories?.name || '';
        const subcategory = product.subcategories?.name || '';
        const brand = product.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category,
            subcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand,
            brand,
        } as Product;
    });

    return transformedProducts;
}

// Helper function to get categories and subcategories from products
export async function getCategoriesAndSubcategories() {
    const supabase = createBrowserClient()

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name')

    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
        return []
    }

    // Get all subcategories with their category IDs
    const { data: subcategories, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('id, name, category_id')

    if (subcategoriesError) {
        console.error('Error fetching subcategories:', subcategoriesError)
        return []
    }

    // Transform the data to the format needed for the navigation
    return categories.map(category => ({
        section: decodeURIComponent(category.name),
        items: subcategories
            .filter(sub => sub.category_id === category.id)
            .map(sub => ({
                name: decodeURIComponent(sub.name)
                    .split('-')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' '),
                href: `/categories/${encodeURIComponent(category.name)}/${encodeURIComponent(sub.name)}`
            }))
    }));
}

// All server-only functions have been moved to data.server.ts
// Add any client-safe functions or exports here as needed.
