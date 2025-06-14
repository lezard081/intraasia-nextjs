import { createClient } from '@/app/lib/utils/supabase/server'
import { cookies } from 'next/headers'
import { Product } from '@/app/lib/types/products'

// Fetch all products from the database
export async function getProducts(): Promise<Product[]> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: products, error } = await supabase
        .from('products')
        .select(`
            id,
            name,
            description,
            image,
            brand_id,
            subcategory_id,
            brands (
                id,
                name
            ),
            subcategories (
                id,
                name,
                category_id,
                categories (
                    id,
                    name
                )
            ),
            product_features (
                feature_id,
                features (
                    id,
                    name
                )
            )
        `)

    if (error) {
        console.error('Error fetching products:', error)
        return []
    }

    // Transform the data to match the Product interface
    return products.map(product => ({
        id: product.id.toString(),
        name: product.name,
        image: product.image || '/product-images/placeholder.jpg',
        category: product.subcategories.categories.name.toLowerCase(),
        subcategory: product.subcategories.name.toLowerCase().replace(/\s+/g, '-'),
        definition: product.description || '',
        features: product.product_features.map(pf => pf.features.name),
        dateAdded: new Date().toISOString(), // Assuming this isn't in the DB schema
        supplier: product.brands.name
    }))
}

// Fetch all categories from the database
export async function getCategories() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: categories, error } = await supabase
        .from('categories')
        .select(`
            id,
            name,
            subcategories (
                id,
                name
            )
        `)

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return categories
}

// Fetch all subcategories from the database
export async function getSubcategories() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: subcategories, error } = await supabase
        .from('subcategories')
        .select(`
            id,
            name,
            category_id,
            categories (
                id,
                name
            )
        `)

    if (error) {
        console.error('Error fetching subcategories:', error)
        return []
    }

    return subcategories
}

// Fetch all brands from the database
export async function getBrands() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: brands, error } = await supabase
        .from('brands')
        .select('*')

    if (error) {
        console.error('Error fetching brands:', error)
        return []
    }

    return brands
}

// Fetch all features from the database
export async function getFeatures() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: features, error } = await supabase
        .from('features')
        .select('*')

    if (error) {
        console.error('Error fetching features:', error)
        return []
    }

    return features
}

// Helper function to get products by category and subcategory
export async function getProductsByCategory(categoryName: string, subcategoryName?: string): Promise<Product[]> {
    const products = await getProducts()

    return products.filter(product => 
        product.category === categoryName && 
        (subcategoryName ? product.subcategory === subcategoryName : true)
    )
}

// Helper function to get a product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts()
    return products.find(product => product.id === id)
}

// Helper function to sort products
export function sortProducts(products: Product[], sortOption: string): Product[] {
    const productsCopy = [...products]

    switch(sortOption) {
        case 'alphabetical':
            return productsCopy.sort((a, b) => a.name.localeCompare(b.name))
        case 'newest':
            return productsCopy.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        case 'oldest':
            return productsCopy.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime())
        case 'supplier':
            return productsCopy.sort((a, b) => a.supplier.localeCompare(b.supplier))
        default:
            return productsCopy
    }
}
