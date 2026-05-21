import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, product_interest, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from("contact_forms").insert({
      name,
      email,
      phone: phone || null,
      product_interest: product_interest || null,
      budget: budget || null,
      message,
      status: "nuevo",
    })

    if (error) {
      console.error("Error saving contact form:", error)
      return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
