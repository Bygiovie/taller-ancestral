"use client"

import { useState } from "react"
import { Plus, Search, DollarSign, TrendingDown, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCLP, formatDate } from "@/lib/utils"
import { EXPENSE_CATEGORIES } from "@/lib/constants"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const MOCK_EXPENSES = [
  { id: "1", date: "2026-05-01", category: "Arriendo taller", supplier: "Inmobiliaria X", amount: 180000, description: "Arriendo mensual taller Ovalle" },
  { id: "2", date: "2026-05-03", category: "Materiales - Resina", supplier: "Químicos Coquimbo", amount: 95000, description: "Resina epóxica cristal 5kg + pigmentos" },
  { id: "3", date: "2026-05-05", category: "Materiales - Metales", supplier: "Metalúrgica Norte", amount: 240000, description: "Fierro cuadrado 20 barras" },
  { id: "4", date: "2026-05-08", category: "Electricidad", supplier: "ENEL", amount: 45000, description: "Cuenta eléctrica mayo" },
  { id: "5", date: "2026-05-10", category: "Herramientas", supplier: "Ferreterías Norte", amount: 85000, description: "Disco ángulo + lijas + brochas" },
  { id: "6", date: "2026-05-12", category: "Transporte / Despacho", supplier: "Transportes Chile", amount: 35000, description: "Despacho mesa de río a La Serena" },
  { id: "7", date: "2026-05-15", category: "Materiales - Madera", supplier: "Maderería Ovalle", amount: 120000, description: "Madera pino seco y eucalipto" },
  { id: "8", date: "2026-05-18", category: "Marketing", supplier: "Agencia Digital", amount: 60000, description: "Publicidad Facebook/Instagram" },
]

const CATEGORY_COLORS = [
  "#5c3d1e", "#c9a84c", "#8b6914", "#3d2a1a", "#a0522d", "#d4a853",
  "#7c5c2e", "#e8b84b", "#6b4c2a", "#b8960c",
]

export default function GastosPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filtered = MOCK_EXPENSES.filter((g) => {
    const matchSearch = g.description.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || g.category === categoryFilter
    return matchSearch && matchCategory
  })

  const totalMonth = MOCK_EXPENSES.reduce((s, g) => s + g.amount, 0)

  const byCategory = EXPENSE_CATEGORIES
    .map((cat) => ({
      name: cat.length > 20 ? cat.substring(0, 20) + "..." : cat,
      fullName: cat,
      value: MOCK_EXPENSES.filter((g) => g.category === cat).reduce((s, g) => s + g.amount, 0),
    }))
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Gastos</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Control de gastos operacionales</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Registrar Gasto
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Total del mes</div>
          <div className="text-xl font-bold text-red-600">{formatCLP(totalMonth)}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Gastos registrados</div>
          <div className="text-xl font-bold text-[var(--foreground)]">{MOCK_EXPENSES.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Mayor gasto</div>
          <div className="text-sm font-bold text-[var(--foreground)]">{byCategory[0]?.fullName}</div>
          <div className="text-sm text-red-600">{formatCLP(byCategory[0]?.value ?? 0)}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Promedio por gasto</div>
          <div className="text-xl font-bold text-[var(--foreground)]">
            {formatCLP(Math.round(totalMonth / MOCK_EXPENSES.length))}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={byCategory} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
                <Tooltip formatter={(value) => [formatCLP(Number(value))]} />
                <Bar dataKey="value" name="Gasto" fill="#5c3d1e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={byCategory}
                    dataKey="value"
                    nameKey="fullName"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                    fontSize={10}
                  >
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCLP(Number(value))]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y tabla */}
      <Card>
        <CardContent className="p-4 pb-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                placeholder="Buscar gastos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            >
              <option value="all">Todas las categorías</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </CardContent>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden md:table-cell">Descripción</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden lg:table-cell">Proveedor</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Monto</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((gasto) => (
                  <tr key={gasto.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{formatDate(gasto.date)}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-[var(--foreground)]">{gasto.category}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-[var(--muted-foreground)]">{gasto.description}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-[var(--muted-foreground)]">{gasto.supplier}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-red-600">{formatCLP(gasto.amount)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 hover:bg-[var(--muted)] rounded-lg" title="Ver comprobante">
                        <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[var(--border)] bg-[var(--muted)]">
                  <td colSpan={4} className="px-4 py-3 font-semibold text-sm text-[var(--foreground)]">TOTAL</td>
                  <td className="px-4 py-3 text-right font-bold text-red-600">{formatCLP(filtered.reduce((s, g) => s + g.amount, 0))}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
