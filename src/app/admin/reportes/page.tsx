"use client"

import { useState } from "react"
import { Download, TrendingUp, DollarSign, Users, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCLP } from "@/lib/utils"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts"

const MONTHLY_DATA = [
  { mes: "Ene", ingresos: 1850000, gastos: 620000, proyectos: 3 },
  { mes: "Feb", ingresos: 2200000, gastos: 780000, proyectos: 4 },
  { mes: "Mar", ingresos: 1950000, gastos: 650000, proyectos: 3 },
  { mes: "Abr", ingresos: 2800000, gastos: 920000, proyectos: 5 },
  { mes: "May", ingresos: 3800000, gastos: 1200000, proyectos: 6 },
]

const TOP_PRODUCTS = [
  { name: "Mesa de río", ventas: 8, ingresos: 6800000 },
  { name: "Lámpara vitral", ventas: 15, ingresos: 2700000 },
  { name: "Parrilla custom", ventas: 6, ingresos: 1920000 },
  { name: "Set tablas resina", ventas: 20, ingresos: 1700000 },
  { name: "Pérgola", ventas: 2, ingresos: 4200000 },
]

const CATEGORY_DATA = [
  { name: "Mobiliario", value: 45 },
  { name: "Iluminación", value: 20 },
  { name: "Outdoor", value: 18 },
  { name: "Decoración", value: 12 },
  { name: "Arquitectónico", value: 5 },
]

const COLORS = ["#5c3d1e", "#c9a84c", "#8b6914", "#3d2a1a", "#a0522d"]

export default function ReportesPage() {
  const [period, setPeriod] = useState("month")

  const totalRevenue = MONTHLY_DATA.reduce((s, m) => s + m.ingresos, 0)
  const totalExpenses = MONTHLY_DATA.reduce((s, m) => s + m.gastos, 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Reportes</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Análisis de negocio y métricas</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
            {[
              { v: "week", l: "Semana" },
              { v: "month", l: "Mes" },
              { v: "year", l: "Año" },
            ].map((p) => (
              <button
                key={p.v}
                onClick={() => setPeriod(p.v)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  period === p.v ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--muted)]"
                }`}
              >
                {p.l}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ingresos totales", value: formatCLP(totalRevenue), icon: <DollarSign className="h-5 w-5 text-white" />, color: "bg-green-600", sub: "+12% vs período anterior" },
          { label: "Gastos totales", value: formatCLP(totalExpenses), icon: <TrendingUp className="h-5 w-5 text-white" />, color: "bg-red-600", sub: "35% de ingresos" },
          { label: "Utilidad neta", value: formatCLP(totalProfit), icon: <DollarSign className="h-5 w-5 text-white" />, color: "bg-[var(--primary)]", sub: `Margen ${profitMargin}%` },
          { label: "Proyectos entregados", value: "21", icon: <Package className="h-5 w-5 text-white" />, color: "bg-blue-600", sub: "Período actual" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[var(--border)] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center`}>
                {kpi.icon}
              </div>
            </div>
            <div className="text-xl font-bold text-[var(--foreground)] mb-0.5">{kpi.value}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{kpi.label}</div>
            <div className="text-xs text-green-600 mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Gráfico principal: Ingresos vs Gastos */}
      <Card>
        <CardHeader>
          <CardTitle>Ingresos vs Gastos vs Utilidad</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [formatCLP(Number(value))]} />
              <Legend />
              <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#16a34a" fill="#16a34a20" strokeWidth={2} />
              <Area type="monotone" dataKey="gastos" name="Gastos" stroke="#dc2626" fill="#dc262620" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top productos + Distribución por categoría */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Productos por Ingreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TOP_PRODUCTS.sort((a, b) => b.ingresos - a.ingresos).map((product, i) => (
                <div key={product.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-[var(--muted)] rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium text-[var(--foreground)]">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--primary)]">{formatCLP(product.ingresos)}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{product.ventas} ventas</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full"
                      style={{ width: `${(product.ingresos / TOP_PRODUCTS[0].ingresos) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {CATEGORY_DATA.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Proyectos por mes */}
      <Card>
        <CardHeader>
          <CardTitle>Proyectos finalizados por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="proyectos" name="Proyectos" fill="#c9a84c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
