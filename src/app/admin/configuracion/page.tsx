"use client"

import { useState } from "react"
import { Save, Upload, Building2, Phone, Mail, Globe, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function ConfiguracionPage() {
  const [saving, setSaving] = useState(false)

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Configuración guardada correctamente")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Configuración</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Ajusta los datos de tu negocio</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Guardar cambios
            </div>
          )}
        </Button>
      </div>

      <Tabs defaultValue="empresa">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="facturacion">Facturación SII</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="mt-6 space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Logo y marca
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                TA
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  Sube el logo de tu empresa. Se mostrará en cotizaciones, facturas y el sitio web.
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" /> Subir logo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Datos empresa */}
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre comercial</Label>
                  <Input defaultValue="Taller Ancestral" />
                </div>
                <div className="space-y-2">
                  <Label>Razón social</Label>
                  <Input placeholder="Juan Pérez González" />
                </div>
                <div className="space-y-2">
                  <Label>RUT</Label>
                  <Input placeholder="12.345.678-9" />
                </div>
                <div className="space-y-2">
                  <Label>Giro</Label>
                  <Input defaultValue="Fabricación de muebles y artículos artesanales" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input placeholder="Calle, número, ciudad" />
                </div>
                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Input defaultValue="Ovalle" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto y redes sociales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Teléfono / WhatsApp</Label>
                  <Input defaultValue="+56912345678" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</Label>
                  <Input defaultValue="contacto@tallerancentral.cl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Instagram</Label>
                  <Input defaultValue="@tallerancentral" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" /> Facebook</Label>
                  <Input defaultValue="tallerancentral" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parámetros de venta */}
          <Card>
            <CardHeader>
              <CardTitle>Parámetros de venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Validez cotizaciones (días)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label>Anticipo requerido (%)</Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div className="space-y-2">
                  <Label>IVA (%)</Label>
                  <Input type="number" defaultValue="19" disabled />
                  <p className="text-xs text-[var(--muted-foreground)]">Fijo según SII Chile</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facturacion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos para Factura Electrónica (SII Chile)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>Nota:</strong> Para emitir facturas electrónicas certificadas por el SII, debes obtener el Certificado Digital y configurar los folios en el sistema del SII. Estos datos son para la generación de documentos internos y pre-facturas.
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>RUT emisor</Label>
                  <Input placeholder="12.345.678-9" />
                </div>
                <div className="space-y-2">
                  <Label>Razón social emisor</Label>
                  <Input placeholder="Juan Pérez González" />
                </div>
                <div className="space-y-2">
                  <Label>Giro</Label>
                  <Input defaultValue="Fabricación de muebles y artículos artesanales" />
                </div>
                <div className="space-y-2">
                  <Label>Actividad económica</Label>
                  <Input placeholder="3610 - Fabricación de muebles" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dirección fiscal</Label>
                <Input placeholder="Dirección completa para facturas" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Banco</Label>
                  <Input placeholder="Banco Estado" />
                </div>
                <div className="space-y-2">
                  <Label>Número de cuenta</Label>
                  <Input placeholder="0001234567890" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Términos de cotización</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={6}
                defaultValue="Esta cotización tiene validez de 15 días hábiles desde su emisión. Los precios incluyen IVA (19%). Se requiere el 50% de anticipo para iniciar la producción. El saldo se cancela a la entrega del producto. Los tiempos de producción son estimativos y pueden variar según disponibilidad de materiales."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Términos de factura</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={4}
                defaultValue="Pago al contado. Transferencia bancaria: Banco Estado, Cuenta Corriente N° XXXX, RUT: XX.XXX.XXX-X. Enviar comprobante a contacto@tallerancentral.cl"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios del sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {[
                  { name: "Juan (CEO)", email: "juan@tallerancentral.cl", role: "admin" },
                  { name: "Ayudante", email: "ayudante@tallerancentral.cl", role: "editor" },
                ].map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[var(--foreground)]">{user.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{user.email}</div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin" ? "bg-[var(--primary)] text-white" : "bg-[var(--secondary)] text-[var(--foreground)]"
                    }`}>
                      {user.role === "admin" ? "Administrador" : "Editor"}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4" /> Agregar usuario
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}
