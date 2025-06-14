import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase environment variables are missing');
            throw new Error('Supabase configuration error');
        }

        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        );
    } catch (error) {
        console.error('Error creating Supabase client:', error);
        // Return a dummy client that will gracefully fail
        // This prevents the app from crashing but logs errors
        return {
            from: () => ({
                select: () => Promise.resolve({ data: [], error: new Error('Supabase client initialization failed') })
            }),
            // Add other methods as needed
        } as any;
    }
};
