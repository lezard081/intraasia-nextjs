import { createClient as createServerClient } from '@/app/lib/utils/supabase/server'
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

