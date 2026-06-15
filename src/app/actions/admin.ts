"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );
}

export async function addProduct(formData: FormData) {
  const supabase = await getSupabase();
  
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const image = formData.get("image") as string;
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    description,
    price,
    stock,
    images: [image],
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProductStock(id: string, newStock: number) {
  const supabase = await getSupabase();
  
  const { error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", id);

  if (error) return { error: error.message };
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await getSupabase();
  
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function seedProducts() {
  const supabase = await getSupabase();
  
  const MOCK_PRODUCTS = [
    {
      name: "Nexus Vision Pro",
      description: "Óculos de realidade mista com resolução 8K por olho.",
      price: 3499.0,
      stock: 10,
      image: "https://images.unsplash.com/photo-1622615609420-7214bb5333f2?w=800&q=80",
    },
    {
      name: "Aether Laptop M4",
      description: "Desempenho ultrarrápido em uma carcaça de nanocarbono.",
      price: 2199.0,
      stock: 15,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    },
    {
      name: "Aura Smartwatch",
      description: "Monitoramento biológico avançado com bateria nuclear de 1 ano.",
      price: 599.0,
      stock: 50,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    }
  ];

  for (const product of MOCK_PRODUCTS) {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    await supabase.from("products").insert({
      name: product.name,
      slug,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: [product.image],
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
