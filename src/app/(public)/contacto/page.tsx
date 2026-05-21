"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { BUSINESS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      if (res.ok) setSent(true)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="pt-20">
      <div className="bg-[#1c1410] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Contacto</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Estamos aquí para hacer realidad tu proyecto. Escríbenos o llámanos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Información de contacto</h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)] mb-1">Ubicación</div>
                  <div className="text-[var(--muted-foreground)] text-sm">
                    {BUSINESS.city}, {BUSINESS.region}, {BUSINESS.country}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)] mb-1">WhatsApp / Teléfono</div>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}`}
                    className="text-[var(--accent)] hover:underline text-sm"
                  >
                    {BUSINESS.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)] mb-1">Email</div>
                  <a href={`mailto:${BUSINESS.email}`} className="text-[var(--accent)] hover:underline text-sm">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)] mb-1">Horario</div>
                  <div className="text-[var(--muted-foreground)] text-sm">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábado: 10:00 - 14:00
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=Hola! Quiero consultar sobre sus productos artesanales.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="text-xl">💬</span>
              Chatear por WhatsApp
            </a>

            {/* Map placeholder */}
            <div className="mt-8 bg-[var(--muted)] rounded-xl h-48 flex items-center justify-center border border-[var(--border)]">
              <div className="text-center text-[var(--muted-foreground)]">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">Ovalle, Coquimbo, Chile</div>
                <div className="text-xs mt-1">Dirección exacta al contactar</div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Envíanos un mensaje</h2>

            {sent ? (
              <div className="text-center py-16">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">¡Mensaje enviado!</h3>
                <p className="text-[var(--muted-foreground)]">
                  Te responderemos dentro de 24 horas hábiles. Si necesitas respuesta inmediata, escríbenos por WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input id="name" name="name" required placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                    <Input id="phone" name="phone" placeholder="+56 9 XXXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product_interest">Producto de interés</Label>
                    <Input id="product_interest" name="product_interest" placeholder="Mesa de río, lámpara, parrilla..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto estimado</Label>
                  <Input id="budget" name="budget" placeholder="Ej: $200.000 - $500.000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Cuéntanos sobre tu proyecto: medidas, materiales, colores, uso, plazo..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Enviar Mensaje
                    </div>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
