"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getProducts() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Map to the shape expected by the frontend
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: "Geral", // Defaulting as category_id is complex for now
    image: product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    rating: 5.0, // Mock rating
    stock: product.stock,
  }));
}
