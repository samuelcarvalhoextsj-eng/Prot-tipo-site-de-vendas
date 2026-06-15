"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { CartItem } from "@/store/useCartStore"

export async function processCheckout(items: CartItem[], totalAmount: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Você precisa estar logado para finalizar a compra." }
  }

  // Check stock and create order in a transaction via RPC or sequentially if no RPC
  // Since we don't have an RPC function defined in the SQL for the whole transaction,
  // we'll do it sequentially for now. In production, an RPC or Edge Function is better to avoid race conditions.

  try {
    // 1. Create the Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'pending',
        total_amount: totalAmount,
        shipping_address: { type: "digital_delivery" } // Mock address
      })
      .select()
      .single()

    if (orderError) throw new Error(orderError.message)

    // 2. Create Order Items (This will trigger the decrement_stock trigger in SQL)
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_time: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      // Rollback order if items fail (e.g. out of stock)
      await supabase.from('orders').delete().eq('id', order.id)
      throw new Error("Erro ao processar itens. " + itemsError.message)
    }
    
    // 3. Dispatch n8n webhook (Simulated for Phase 6)
    if (process.env.N8N_WEBHOOK_URL_NOTIFICATIONS) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL_NOTIFICATIONS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'new_order', order_id: order.id, user_id: user.id, total: totalAmount })
        })
      } catch (e) {
        console.error("Failed to notify n8n", e)
      }
    }

    revalidatePath('/perfil')
    return { success: true, orderId: order.id }

  } catch (error: any) {
    console.error("Checkout error:", error)
    return { error: error.message || "Erro desconhecido ao finalizar compra." }
  }
}
