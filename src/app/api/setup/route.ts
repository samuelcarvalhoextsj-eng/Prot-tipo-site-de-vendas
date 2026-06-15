import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Você precisa estar logado para rodar o setup inicial.' }, { status: 401 })
  }

  // 1. Update user role to admin
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id)

  if (profileError) {
    return NextResponse.json({ error: 'Erro ao atualizar perfil', details: profileError }, { status: 500 })
  }

  // 2. Insert Categories
  const { data: existingCategories } = await supabase.from('categories').select('*')
  let electronicsId, clothingId;

  if (!existingCategories || existingCategories.length === 0) {
    const { data: categories, error: catError } = await supabase.from('categories').insert([
      { name: 'Eletrônicos', slug: 'eletronicos', description: 'Produtos eletrônicos de última geração' },
      { name: 'Vestuário', slug: 'vestuario', description: 'Roupas e acessórios da moda' }
    ]).select()

    if (catError) {
      return NextResponse.json({ error: 'Erro ao criar categorias', details: catError }, { status: 500 })
    }
    electronicsId = categories.find(c => c.slug === 'eletronicos').id;
    clothingId = categories.find(c => c.slug === 'vestuario').id;
  } else {
    electronicsId = existingCategories[0].id;
    clothingId = existingCategories.length > 1 ? existingCategories[1].id : existingCategories[0].id;
  }

  // 3. Insert Products
  const { data: existingProducts } = await supabase.from('products').select('*')

  if (!existingProducts || existingProducts.length === 0) {
    const { error: prodError } = await supabase.from('products').insert([
      { 
        name: 'Smartphone X', 
        slug: 'smartphone-x', 
        description: 'Um smartphone incrível com câmera de alta resolução.',
        price: 2999.99,
        stock: 50,
        category_id: electronicsId,
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'],
        is_featured: true
      },
      { 
        name: 'Fone de Ouvido Bluetooth', 
        slug: 'fone-bluetooth', 
        description: 'Som de alta qualidade e cancelamento de ruído.',
        price: 499.99,
        stock: 100,
        category_id: electronicsId,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'],
        is_featured: true
      },
      { 
        name: 'Camiseta Básica', 
        slug: 'camiseta-basica', 
        description: 'Camiseta 100% algodão, super confortável.',
        price: 89.90,
        stock: 200,
        category_id: clothingId,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'],
        is_featured: false
      },
      { 
        name: 'Smartwatch Pro', 
        slug: 'smartwatch-pro', 
        description: 'Monitoramento de saúde e bateria de longa duração.',
        price: 1299.99,
        stock: 30,
        category_id: electronicsId,
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop'],
        is_featured: true
      }
    ])

    if (prodError) {
      return NextResponse.json({ error: 'Erro ao criar produtos', details: prodError }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true, message: 'Setup concluído! Você agora é admin e os produtos foram inseridos.' })
}
