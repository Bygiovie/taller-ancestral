"use client"

import { useState } from "react"
import { Plus, Search, Eye, Send, CheckCircle, XCircle, FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatCLP, formatDate, getStatusColor } from "@/lib/utils"

const MOCK_QUOTATIONS = [
  {
    id: "1", number: "COT-000001", customer: "María González", email: "maria@email.com",
    total: 850000, status: "enviada", created_at: "2026-05-15", valid_until: "2026-05-30",
    items_count: 1, production_days: 21,
  },
  {
    id: "2", number: "COT-000002", customer: "Restaurant El Marqués", email: "marqués@email.com",
    total: 1440000, status: "aprobada", created_at: "2026-05-10", valid_until: "2026-05-25",
    items_count: 8, production_days: 30,
  },
  {
    id: "3", number: "COT-000003", customer: "Carlos Vega", email: "carlos@email.com",
    total: 320000, status: "pendiente", created_at: "2026-05-18", valid_until: "2026-06-02",
    items_count: 1, production_days: 7,
  },
  {
    id: "4", number: "COT-000004", customer: "Ana Morales", email: "ana@email.com",
    total: 2100000, status: "rechazada", created_at: "2026-05-05", valid_until: "2026-05-20",
    items_count: 3, production_days: 45,
  },
]

const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  en_revision: "En Revisión",
  enviada: "Enviada",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
}

export default function CotizacionesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = MOCK_QUOTATIONS.filter((q) => {
    const matchSearch = q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.number.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || q.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Cotizaciones</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{MOCK_QUOTATIONS.length} cotizaciones en total</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Nueva Cotización
        </Button>
      </div>

      {/* KPIs rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pendientes", value: MOCK_QUOTATIONS.filter((q) => q.status === "pendiente").length, color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
          { label: "Enviadas", value: MOCK_QUOTATIONS.filter((q) => q.status === "enviada").length, color: "bg-blue-50 border-blue-200 text-blue-800" },
          { label: "Aprobadas", value: MOCK_QUOTATIONS.filter((q) => q.status === "aprobada").length, color: "bg-green-50 border-green-200 text-green-800" },
          { label: "Rechazadas", value: MOCK_QUOTATIONS.filter((q) => q.status === "rechazada").length, color: "bg-red-50 border-red-200 text-red-800" },
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
                placeholder="Buscar por cliente o número..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "pendiente", "enviada", "aprobada", "rechazada"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  {s === "all" ? "Todos" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">N°</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider hidden md:table-cell">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider hidden lg:table-cell">Vigencia</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Total</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Estado</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                        <span className="font-mono text-sm font-medium">{q.number}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-[var(--foreground)]">{q.customer}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{q.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm text-[var(--foreground)]">{formatDate(q.created_at)}</div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="text-sm text-[var(--foreground)]">{formatDate(q.valid_until)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-[var(--foreground)]">{formatCLP(q.total)}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{q.items_count} ítem(s)</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(q.status)}`}>
                        {STATUS_LABELS[q.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors" title="Ver">
                          <Eye className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors" title="Descargar PDF">
                          <Download className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        {q.status === "pendiente" && (
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Enviar por email">
                            <Send className="h-4 w-4 text-blue-600" />
                          </button>
                        )}
                        {q.status === "enviada" && (
                          <>
                            <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Aprobar">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Rechazar">
                              <XCircle className="h-4 w-4 text-red-600" />
                            </button>
                          </>
                        )}
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
