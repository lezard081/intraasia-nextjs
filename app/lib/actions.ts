// @ts-nocheck
import { cookies } from "next/headers";
import { createClient } from "@/app/lib/utils/supabase/server";

// Fetch all products from the database
export async function fetchProducts() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    return data;
}

// Fetch all categories from the categories table
export async function fetchCategories() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data;
}

// Fetch all brands from the brands table
export async function fetchBrands() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("brands").select("*");
    if (error) throw error;
    return data;
}

// Fetch all subcategories from the subcategories table
export async function fetchSubcategories() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("subcategories").select("*");
    if (error) throw error;
    return data;
}

// Fetch all features from the features table
export async function fetchFeatures() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("features").select("*");
    if (error) throw error;
    return data;
}

// Fetch all product_features join table entries
export async function fetchProductFeatures() {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("product_features").select("*");
    if (error) throw error;
    return data;
}