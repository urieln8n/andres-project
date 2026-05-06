'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) return { error: error.message }
  revalidatePath('/orders')
  return { success: true }
}

type NewOrderItem = {
  product_id: string
  quantity: number
  unit_price: number
}

export async function createOrder(
  customerName: string,
  items: NewOrderItem[],
  notes?: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user.id)
    .single()

  if (!profile?.business_id) return { error: 'Sin negocio asociado' }

  let customerId: string | null = null
  if (customerName.trim()) {
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .eq('business_id', profile.business_id)
      .ilike('name', customerName.trim())
      .maybeSingle()

    if (existing) {
      customerId = existing.id
    } else {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({ business_id: profile.business_id, name: customerName.trim() })
        .select('id')
        .single()
      customerId = newCustomer?.id ?? null
    }
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      business_id: profile.business_id,
      customer_id: customerId,
      status: 'pending',
      total,
      notes: notes?.trim() || null,
    })
    .select('id')
    .single()

  if (orderError || !order) return { error: 'Error al crear pedido' }

  if (items.length > 0) {
    const { error: itemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }))
    )
    if (itemsError) return { error: 'Pedido creado pero error en los ítems' }
  }

  revalidatePath('/orders')
  return { success: true }
}
