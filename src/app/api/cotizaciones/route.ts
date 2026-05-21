import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, city, category, dimensions, deadline, budget, description, techniques } = body

    if (!name || !email || !description) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = await createClient()

    const message = `
Proyecto: ${category || "Sin especificar"}
Dimensiones: ${dimensions || "No especificadas"}
Plazo: ${deadline || "No especificado"}
Presupuesto: ${budget || "No especificado"}
Técnicas de interés: ${Array.isArray(techniques) ? techniques.join(", ") : "No especificadas"}
Ciudad entrega: ${city || "No especificada"}

Descripción:
${description}
    `.trim()

    const { error } = await supabase.from("contact_forms").insert({
      name,
      email,
      phone: phone || null,
      product_interest: category || null,
      budget: budget || null,
      message,
      status: "nuevo",
    })

    if (error) {
      console.error("Error saving quotation request:", error)
      return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Quotation API error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
