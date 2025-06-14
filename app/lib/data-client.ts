import { createClient } from '@/app/lib/utils/supabase/client'
import { Product } from '@/app/lib/types/products'
import { SlideData } from '@/app/lib/types/slides'

// Fetch all products from the database
export async function getProducts(): Promise<Product[]> {
    try {
        const supabase = createClient()

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

        if (!products || products.length === 0) {
            return []
        }

        // Transform the data to match the Product interface
        return products
            .filter(product => 
                product && 
                product.subcategories && 
                product.subcategories.categories && 
                product.brands
            )
            .map(product => ({
                id: product.id.toString(),
                name: product.name || 'Unnamed Product',
                image: product.image || '/product-images/placeholder.jpg',
                category: (product.subcategories.categories.name || 'uncategorized').toLowerCase(),
                subcategory: (product.subcategories.name || 'uncategorized').toLowerCase().replace(/\s+/g, '-'),
                definition: product.description || '',
                features: product.product_features ? 
                    product.product_features
                        .filter(pf => pf && pf.features)
                        .map(pf => pf.features.name || 'Unnamed Feature') : 
                    [],
                dateAdded: new Date().toISOString(), // Assuming this isn't in the DB schema
                supplier: product.brands.name || 'Unknown Supplier'
            }))
    } catch (error) {
        console.error('Error in getProducts:', error)
        return []
    }
}

// Fetch all categories from the database
export async function getCategories() {
    try {
        const supabase = createClient()

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

        return categories || []
    } catch (error) {
        console.error('Error in getCategories:', error)
        return []
    }
}

// Fetch all subcategories from the database
export async function getSubcategories() {
    try {
        const supabase = createClient()

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

        return subcategories || []
    } catch (error) {
        console.error('Error in getSubcategories:', error)
        return []
    }
}

// Fetch all brands from the database
export async function getBrands() {
    try {
        const supabase = createClient()

        const { data: brands, error } = await supabase
            .from('brands')
            .select('*')

        if (error) {
            console.error('Error fetching brands:', error)
            return []
        }

        return brands || []
    } catch (error) {
        console.error('Error in getBrands:', error)
        return []
    }
}

// Fetch all features from the database
export async function getFeatures() {
    try {
        const supabase = createClient()

        const { data: features, error } = await supabase
            .from('features')
            .select('*')

        if (error) {
            console.error('Error fetching features:', error)
            return []
        }

        return features || []
    } catch (error) {
        console.error('Error in getFeatures:', error)
        return []
    }
}

// Helper function to get products by category and subcategory
export async function getProductsByCategory(categoryName: string, subcategoryName?: string): Promise<Product[]> {
    try {
        const products = await getProducts()

        return products.filter(product => 
            product.category === categoryName && 
            (subcategoryName ? product.subcategory === subcategoryName : true)
        )
    } catch (error) {
        console.error('Error in getProductsByCategory:', error)
        return []
    }
}

// Helper function to get a product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const products = await getProducts()
        return products.find(product => product.id === id)
    } catch (error) {
        console.error('Error in getProductById:', error)
        return undefined
    }
}

// Helper function to sort products
export function sortProducts(products: Product[], sortOption: string): Product[] {
    try {
        if (!products || !Array.isArray(products)) {
            return []
        }

        const productsCopy = [...products]

        switch(sortOption) {
            case 'alphabetical':
                return productsCopy.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            case 'newest':
                return productsCopy.sort((a, b) => {
                    try {
                        return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime()
                    } catch (error) {
                        return 0
                    }
                })
            case 'oldest':
                return productsCopy.sort((a, b) => {
                    try {
                        return new Date(a.dateAdded || 0).getTime() - new Date(b.dateAdded || 0).getTime()
                    } catch (error) {
                        return 0
                    }
                })
            case 'supplier':
                return productsCopy.sort((a, b) => (a.supplier || '').localeCompare(b.supplier || ''))
            default:
                return productsCopy
        }
    } catch (error) {
        console.error('Error in sortProducts:', error)
        return Array.isArray(products) ? products : []
    }
}

// Get hero slides data
export async function getHeroSlides(): Promise<SlideData[]> {
    try {
        // This could be fetched from a database in the future
        // For now, we'll return static data
        return [
            {
                id: 1,
                image: '/hero-images/hero-1.jpg',
            },
            {
                id: 2,
                image: '/hero-images/hero-2.jpg',
            },
            {
                id: 3,
                image: '/hero-images/hero-3.jpg',
            }
        ];
    } catch (error) {
        console.error('Error in getHeroSlides:', error)
        return []
    }
}
