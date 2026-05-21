"use client"

import { useState } from "react"
import { Plus, Search, Phone, Mail, Star, User, Building2, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatDate, getStatusColor } from "@/lib/utils"

const MOCK_CUSTOMERS = [
  {
    id: "1", full_name: "María González", rut: "12.345.678-9", email: "maria@deco.cl",
    phone: "+56 9 1234 5678", city: "Santiago", type: "disenador", segment: "vip",
    projects: 5, total_spent: 4200000, last_purchase: "2026-05-10", tags: ["diseño", "premium"],
  },
  {
    id: "2", full_name: "Restaurant El Marqués", rut: "76.543.210-1", email: "contacto@marques.cl",
    phone: "+56 9 8765 4321", city: "La Serena", type: "hotel_restaurante", segment: "recurrente",
    projects: 3, total_spent: 3600000, last_purchase: "2026-05-12", tags: ["comercial", "gastronomía"],
  },
  {
    id: "3", full_name: "Carlos Vega", rut: "15.678.901-2", email: "carlos@gmail.com",
    phone: "+56 9 5555 6666", city: "Ovalle", type: "particular", segment: "nuevo",
    projects: 1, total_spent: 320000, last_purchase: "2026-05-18", tags: [],
  },
  {
    id: "4", full_name: "Ana Morales", rut: "18.901.234-5", email: "ana@morales.cl",
    phone: "+56 9 7777 8888", city: "Coquimbo", type: "particular", segment: "recurrente",
    projects: 2, total_spent: 2800000, last_purchase: "2026-04-20", tags: ["residencial"],
  },
]

const TYPE_LABELS: Record<string, string> = {
  particular: "Particular",
  arquitecto: "Arquitecto",
  disenador: "Diseñador",
  empresa: "Empresa",
  hotel_restaurante: "Hotel/Restaurant",
}
const SEGMENT_LABELS: Record<string, string> = {
  vip: "VIP", recurrente: "Recurrente", nuevo: "Nuevo", inactivo: "Inactivo",
}

export default function ClientesPage() {
  const [search, setSearch] = useState("")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [view, setView] = useState<"table" | "cards">("table")

  const filtered = MOCK_CUSTOMERS.filter((c) => {
    const matchSearch = c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchSegment = segmentFilter === "all" || c.segment === segmentFilter
    return matchSearch && matchSegment
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Clientes</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{MOCK_CUSTOMERS.length} clientes registrados</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "VIP", value: MOCK_CUSTOMERS.filter((c) => c.segment === "vip").length, color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
          { label: "Recurrentes", value: MOCK_CUSTOMERS.filter((c) => c.segment === "recurrente").length, color: "bg-green-50 border-green-200 text-green-800" },
          { label: "Nuevos", value: MOCK_CUSTOMERS.filter((c) => c.segment === "nuevo").length, color: "bg-blue-50 border-blue-200 text-blue-800" },
          { label: "Inactivos", value: MOCK_CUSTOMERS.filter((c) => c.segment === "inactivo").length, color: "bg-gray-50 border-gray-200 text-gray-800" },
        ].map((kpi) => (
          <div key={kpi.label} className={`p-4 rounded-xl border ${kpi.color}`}>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-sm">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "vip", "recurrente", "nuevo", "inactivo"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSegmentFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                    segmentFilter === s
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  {s === "all" ? "Todos" : SEGMENT_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de clientes */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden md:table-cell">Tipo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden lg:table-cell">Contacto</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Proyectos</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden sm:table-cell">Total gastado</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Segmento</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {customer.full_name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[var(--foreground)]">{customer.full_name}</div>
                          <div className="text-xs text-[var(--muted-foreground)] font-mono">{customer.rut}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-[var(--foreground)]">{TYPE_LABELS[customer.type]}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${customer.email}`} className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </a>
                        <a href={`tel:${customer.phone}`} className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {customer.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-[var(--foreground)]">{customer.projects}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <div className="font-semibold text-[var(--foreground)]">
                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(customer.total_spent)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        customer.segment === "vip" ? "bg-yellow-100 text-yellow-800" :
                        customer.segment === "recurrente" ? "bg-green-100 text-green-800" :
                        customer.segment === "nuevo" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {customer.segment === "vip" && <Star className="h-3 w-3" />}
                        {SEGMENT_LABELS[customer.segment]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-[var(--muted)] rounded-lg">
                          <Edit className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
