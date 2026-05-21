"use client"

import { useState } from "react"
import { Plus, Search, Download, Send, DollarSign, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCLP, formatDate, getStatusColor } from "@/lib/utils"

const MOCK_INVOICES = [
  {
    id: "1", number: "BOL-000001", type: "boleta", customer: "María González",
    rut: "12.345.678-9", total: 850000, paid_amount: 850000, balance: 0,
    payment_status: "pagado", payment_method: "transferencia",
    created_at: "2026-05-10", due_date: "2026-05-17",
  },
  {
    id: "2", number: "FAC-000001", type: "factura", customer: "Restaurant El Marqués",
    rut: "76.543.210-1", total: 720000, paid_amount: 360000, balance: 360000,
    payment_status: "parcial", payment_method: "transferencia",
    created_at: "2026-05-12", due_date: "2026-05-26",
  },
  {
    id: "3", number: "BOL-000002", type: "boleta", customer: "Carlos Vega",
    rut: "15.678.901-2", total: 320000, paid_amount: 0, balance: 320000,
    payment_status: "pendiente", payment_method: "efectivo",
    created_at: "2026-05-18", due_date: "2026-05-25",
  },
  {
    id: "4", number: "FAC-000002", type: "factura", customer: "Constructora Norte",
    rut: "89.012.345-6", total: 2100000, paid_amount: 1050000, balance: 1050000,
    payment_status: "parcial", payment_method: "transferencia",
    created_at: "2026-05-02", due_date: "2026-05-09",
  },
]

const TYPE_LABELS: Record<string, string> = {
  factura: "Factura", boleta: "Boleta", nota_credito: "N. Crédito", nota_debito: "N. Débito",
}
const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente", parcial: "Parcial", pagado: "Pagado",
}

export default function FacturacionPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = MOCK_INVOICES.filter((inv) => {
    const matchSearch = inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.number.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || inv.payment_status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPendiente = MOCK_INVOICES.filter((i) => i.payment_status !== "pagado").reduce((s, i) => s + i.balance, 0)
  const totalCobrado = MOCK_INVOICES.filter((i) => i.payment_status === "pagado").reduce((s, i) => s + i.total, 0)
  const totalParcial = MOCK_INVOICES.filter((i) => i.payment_status === "parcial").reduce((s, i) => s + i.paid_amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Facturación</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Gestión de facturas y boletas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nueva Factura / Boleta
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            <span className="text-xs font-medium text-green-700 uppercase">Cobrado</span>
          </div>
          <div className="text-xl font-bold text-green-800">{formatCLP(totalCobrado)}</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-yellow-700" />
            <span className="text-xs font-medium text-yellow-700 uppercase">Parcial</span>
          </div>
          <div className="text-xl font-bold text-yellow-800">{formatCLP(totalParcial)}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-700" />
            <span className="text-xs font-medium text-red-700 uppercase">Por cobrar</span>
          </div>
          <div className="text-xl font-bold text-red-800">{formatCLP(totalPendiente)}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-blue-700" />
            <span className="text-xs font-medium text-blue-700 uppercase">Total emitido</span>
          </div>
          <div className="text-xl font-bold text-blue-800">{formatCLP(MOCK_INVOICES.reduce((s, i) => s + i.total, 0))}</div>
        </div>
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
            <div className="flex gap-2">
              {["all", "pendiente", "parcial", "pagado"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">N° / Tipo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden md:table-cell">Fecha</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Total</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden sm:table-cell">Saldo</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Estado</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono text-sm font-medium text-[var(--foreground)]">{inv.number}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{TYPE_LABELS[inv.type]}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-[var(--foreground)]">{inv.customer}</div>
                      <div className="text-xs text-[var(--muted-foreground)] font-mono">{inv.rut}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm text-[var(--foreground)]">{formatDate(inv.created_at)}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Vence: {formatDate(inv.due_date)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-[var(--foreground)]">{formatCLP(inv.total)}</div>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <div className={`font-semibold ${inv.balance > 0 ? "text-red-600" : "text-green-600"}`}>
                        {formatCLP(inv.balance)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(inv.payment_status)}`}>
                        {STATUS_LABELS[inv.payment_status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-[var(--muted)] rounded-lg" title="Descargar PDF">
                          <Download className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        <button className="p-2 hover:bg-[var(--muted)] rounded-lg" title="Enviar por email">
                          <Send className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        {inv.payment_status !== "pagado" && (
                          <button className="p-2 hover:bg-green-50 rounded-lg" title="Registrar pago">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </button>
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
