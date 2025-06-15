import { createClient as createServerClient } from '@/app/lib/utils/supabase/server'
import { createClient as createBrowserClient } from '@/app/lib/utils/supabase/client'
import { cookies } from 'next/headers'
import { Product, SortOption } from '@/app/lib/types/products'

// Server-side functions (for use in Server Components and API routes)
export async function getCategories() {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data, error } = await supabase
        .from('intraasia.categories')
        .select('id, name')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}

export async function getSubcategories(categoryId?: number) {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    let query = supabase
        .from('intraasia.subcategories')
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

export async function getBrands() {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data, error } = await supabase
        .from('intraasia.brands')
        .select('id, name')

    if (error) {
        console.error('Error fetching brands:', error)
        return []
    }

    return data
}

export async function getFeatures() {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data, error } = await supabase
        .from('intraasia.features')
        .select('id, name')

    if (error) {
        console.error('Error fetching features:', error)
        return []
    }

    return data
}

export async function getProducts() {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data: products, error: productsError } = await supabase
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
        `)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const transformedProducts = products.map(product => {
        const features = productFeatures
            ? productFeatures
                .filter(pf => pf.product_id === product.id)
                .map(pf => pf.intraasia.features.name)
            : [];

        const category = product.intraasia.subcategories.intraasia.categories.name;
        const subcategory = product.intraasia.subcategories.name;
        const brand = product.intraasia.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category,
            subcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand
        } as Product;
    });

    return transformedProducts;
}

export async function getProductById(id: string) {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data: product, error: productError } = await supabase
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)
        .eq('id', id)
        .single()

    if (productError) {
        console.error('Error fetching product:', productError)
        return null
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
        `)
        .eq('product_id', id)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const features = productFeatures
        ? productFeatures.map(pf => pf.intraasia.features.name)
        : [];

    const category = product.intraasia.subcategories.intraasia.categories.name;
    const subcategory = product.intraasia.subcategories.name;
    const brand = product.intraasia.brands?.name || 'Unknown';

    return {
        id: product.id.toString(),
        name: product.name,
        image: product.image || '/placeholder.jpg',
        category,
        subcategory,
        definition: product.description || '',
        features,
        dateAdded: new Date().toISOString(), // This would need to be added to the database
        supplier: brand
    } as Product;
}

export async function getProductsByCategory(category: string, subcategory?: string) {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    // First get the category ID
    const { data: categoryData, error: categoryError } = await supabase
        .from('intraasia.categories')
        .select('id')
        .eq('name', category)
        .single()

    if (categoryError) {
        console.error('Error fetching category:', categoryError)
        return []
    }

    // Then get subcategories for this category
    let subcategoryQuery = supabase
        .from('intraasia.subcategories')
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
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)
        .in('subcategory_id', subcategoryIds)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const productIds = products.map(p => p.id)
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
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
                .map(pf => pf.intraasia.features.name)
            : [];

        const productCategory = product.intraasia.subcategories.intraasia.categories.name;
        const productSubcategory = product.intraasia.subcategories.name;
        const brand = product.intraasia.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category: productCategory,
            subcategory: productSubcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand
        } as Product;
    });

    return transformedProducts;
}

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
        .from('intraasia.categories')
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
        .from('intraasia.subcategories')
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
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
        `)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const transformedProducts = products.map(product => {
        const features = productFeatures
            ? productFeatures
                .filter(pf => pf.product_id === product.id)
                .map(pf => pf.intraasia.features.name)
            : [];

        const category = product.intraasia.subcategories.intraasia.categories.name;
        const subcategory = product.intraasia.subcategories.name;
        const brand = product.intraasia.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category,
            subcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand
        } as Product;
    });

    return transformedProducts;
}

export async function fetchProductById(id: string) {
    const supabase = createBrowserClient()

    const { data: product, error: productError } = await supabase
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)
        .eq('id', id)
        .single()

    if (productError) {
        console.error('Error fetching product:', productError)
        return null
    }

    // Get product features
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
        `)
        .eq('product_id', id)

    if (featuresError) {
        console.error('Error fetching product features:', featuresError)
    }

    // Transform the data to match the Product interface
    const features = productFeatures
        ? productFeatures.map(pf => pf.intraasia.features.name)
        : [];

    const category = product.intraasia.subcategories.intraasia.categories.name;
    const subcategory = product.intraasia.subcategories.name;
    const brand = product.intraasia.brands?.name || 'Unknown';

    return {
        id: product.id.toString(),
        name: product.name,
        image: product.image || '/placeholder.jpg',
        category,
        subcategory,
        definition: product.description || '',
        features,
        dateAdded: new Date().toISOString(), // This would need to be added to the database
        supplier: brand
    } as Product;
}

export async function fetchProductsByCategory(category: string, subcategory?: string) {
    const supabase = createBrowserClient()

    // First get the category ID
    const { data: categoryData, error: categoryError } = await supabase
        .from('intraasia.categories')
        .select('id')
        .eq('name', category)
        .single()

    if (categoryError) {
        console.error('Error fetching category:', categoryError)
        return []
    }

    // Then get subcategories for this category
    let subcategoryQuery = supabase
        .from('intraasia.subcategories')
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
        .from('intraasia.products')
        .select(`
            id, 
            name, 
            description, 
            image,
            brand_id,
            subcategory_id,
            intraasia.brands!products_brand_id_fkey(id, name),
            intraasia.subcategories!products_subcategory_id_fkey(
                id, 
                name, 
                category_id,
                intraasia.categories!subcategories_category_id_fkey(id, name)
            )
        `)
        .in('subcategory_id', subcategoryIds)

    if (productsError) {
        console.error('Error fetching products:', productsError)
        return []
    }

    // Get product features
    const productIds = products.map(p => p.id)
    const { data: productFeatures, error: featuresError } = await supabase
        .from('intraasia.product_features')
        .select(`
            product_id,
            feature_id,
            intraasia.features!product_features_feature_id_fkey(id, name)
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
                .map(pf => pf.intraasia.features.name)
            : [];

        const productCategory = product.intraasia.subcategories.intraasia.categories.name;
        const productSubcategory = product.intraasia.subcategories.name;
        const brand = product.intraasia.brands?.name || 'Unknown';

        return {
            id: product.id.toString(),
            name: product.name,
            image: product.image || '/placeholder.jpg',
            category: productCategory,
            subcategory: productSubcategory,
            definition: product.description || '',
            features,
            dateAdded: new Date().toISOString(), // This would need to be added to the database
            supplier: brand
        } as Product;
    });

    return transformedProducts;
}

// Helper function to get categories and subcategories from products
export async function getCategoriesAndSubcategories() {
    const supabase = createBrowserClient()

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
        .from('intraasia.categories')
        .select('id, name')

    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
        return []
    }

    // Get all subcategories with their category IDs
    const { data: subcategories, error: subcategoriesError } = await supabase
        .from('intraasia.subcategories')
        .select('id, name, category_id')

    if (subcategoriesError) {
        console.error('Error fetching subcategories:', subcategoriesError)
        return []
    }

    // Transform the data to the format needed for the navigation
    return categories.map(category => ({
        section: category.name,
        items: subcategories
            .filter(sub => sub.category_id === category.id)
            .map(sub => ({
                name: sub.name
                    .split('-')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' '),
                href: `/categories/${category.name}/${sub.name}`
            }))
    }));
}
