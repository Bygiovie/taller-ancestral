"use client"

import { useState } from "react"
import { CheckCircle2, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TECHNIQUES, CATEGORIES } from "@/lib/constants"

const BUDGET_RANGES = [
  "Menos de $100.000",
  "$100.000 - $300.000",
  "$300.000 - $600.000",
  "$600.000 - $1.000.000",
  "$1.000.000 - $2.500.000",
  "Más de $2.500.000",
]

export default function ProyectosPersonalizadosPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([])

  function toggleTechnique(id: string) {
    setSelectedTechniques((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          techniques: selectedTechniques,
        }),
      })
      if (res.ok) setSent(true)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="pt-20">
      <div className="bg-[#1c1410] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Proyectos Personalizados</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Sin límites creativos. Diseñamos y fabricamos exactamente lo que tu espacio necesita.
          </p>
        </div>
      </div>

      {/* Proceso */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Consulta", "Diseño", "Cotización", "Producción", "Entrega"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="text-sm font-medium text-[var(--foreground)]">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sent ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">¡Solicitud recibida!</h2>
            <p className="text-[var(--muted-foreground)] text-lg mb-8">
              Revisaremos tu proyecto y te contactaremos en máximo 24 horas hábiles con una cotización detallada.
            </p>
            <div className="bg-[var(--muted)] rounded-xl p-6 text-left">
              <h4 className="font-semibold text-[var(--foreground)] mb-3">¿Qué sigue?</h4>
              <ul className="space-y-2">
                {[
                  "Analizamos tu solicitud en detalle",
                  "Preparamos renders o bocetos del proyecto",
                  "Te enviamos cotización detallada por email",
                  "Coordinamos una llamada si hay preguntas",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[var(--muted-foreground)] text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Cuéntanos tu proyecto</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Info personal */}
                <div className="bg-white p-6 rounded-xl border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Información de contacto</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input id="name" name="name" required placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                      <Input id="phone" name="phone" placeholder="+56 9 XXXX XXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" name="city" placeholder="¿Dónde se entregará?" />
                    </div>
                  </div>
                </div>

                {/* Proyecto */}
                <div className="bg-white p-6 rounded-xl border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Detalles del proyecto</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría de producto</Label>
                      <select
                        id="category"
                        name="category"
                        className="flex h-10 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      >
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                        <option value="otro">Otro / No sé aún</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dimensions">Medidas aproximadas</Label>
                        <Input id="dimensions" name="dimensions" placeholder="Ej: 200cm x 90cm x 75cm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Plazo deseado de entrega</Label>
                        <Input id="deadline" name="deadline" placeholder="Ej: 1 mes, Navidad, etc." />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Técnicas de interés</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {TECHNIQUES.map((tec) => (
                          <button
                            key={tec.id}
                            type="button"
                            onClick={() => toggleTechnique(tec.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                              selectedTechniques.includes(tec.id)
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                                : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                            }`}
                          >
                            <span>{tec.icon}</span>
                            <span className="truncate">{tec.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Presupuesto estimado</Label>
                      <select
                        id="budget"
                        name="budget"
                        className="flex h-10 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      >
                        <option value="">Selecciona un rango</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Describe tu proyecto *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        required
                        rows={6}
                        placeholder="Cuéntanos en detalle: ¿qué quieres? ¿para qué espacio? ¿colores? ¿tienes referencias de imágenes? ¿es para uso residencial o comercial?"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando solicitud...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Solicitar Cotización Gratuita
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[var(--muted)] rounded-xl p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4">¿Por qué elegirnos?</h3>
                <ul className="space-y-3">
                  {[
                    "Cotización gratuita en 24 horas",
                    "Diseño a medida sin costo extra",
                    "50% anticipo, 50% a la entrega",
                    "Fotos del proceso de producción",
                    "Despacho en la IV Región de Coquimbo",
                    "Garantía de calidad por escrito",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#1c1410] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3">¿Prefieres hablar directamente?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Escríbenos por WhatsApp y te respondemos de inmediato
                </p>
                <a
                  href="https://wa.me/56912345678?text=Hola! Quiero cotizar un proyecto personalizado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  💬 WhatsApp Ahora
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-bold text-[var(--foreground)] mb-4">Proyectos recientes</h3>
                <div className="space-y-3">
                  {[
                    { title: "Mesa de río 2.5m", client: "Restaurant, La Serena", value: "$980.000" },
                    { title: "8 lámparas vitral", client: "Café boutique, Ovalle", value: "$1.440.000" },
                    { title: "Pérgola antisísmica", client: "Residencial, Coquimbo", value: "$2.100.000" },
                  ].map((project) => (
                    <div key={project.title} className="flex items-start justify-between gap-2 py-2 border-b border-[var(--border)] last:border-0">
                      <div>
                        <div className="text-sm font-medium text-[var(--foreground)]">{project.title}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{project.client}</div>
                      </div>
                      <div className="text-sm font-bold text-[var(--primary)] flex-shrink-0">{project.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
