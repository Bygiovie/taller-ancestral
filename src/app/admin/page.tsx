"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  TrendingUp, TrendingDown, FileText, Kanban, AlertTriangle,
  DollarSign, Users, Clock, ArrowRight, Package, CheckCircle2,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCLP, formatDate } from "@/lib/utils"

const MOCK_MONTHLY_DATA = [
  { mes: "Ene", ingresos: 1850000, gastos: 620000 },
  { mes: "Feb", ingresos: 2200000, gastos: 780000 },
  { mes: "Mar", ingresos: 1950000, gastos: 650000 },
  { mes: "Abr", ingresos: 2800000, gastos: 920000 },
  { mes: "May", ingresos: 2450000, gastos: 710000 },
  { mes: "Jun", ingresos: 3100000, gastos: 1050000 },
  { mes: "Jul", ingresos: 2750000, gastos: 890000 },
  { mes: "Ago", ingresos: 3300000, gastos: 980000 },
  { mes: "Sep", ingresos: 2900000, gastos: 820000 },
  { mes: "Oct", ingresos: 3500000, gastos: 1100000 },
  { mes: "Nov", ingresos: 4200000, gastos: 1350000 },
  { mes: "Dic", ingresos: 3800000, gastos: 1200000 },
]

const MOCK_UPCOMING = [
  { id: "1", name: "Mesa de río restaurante", customer: "Carlos Vega", delivery_date: "2026-05-25", status: "en_produccion" },
  { id: "2", name: "Lámpara vitral x4", customer: "María González", delivery_date: "2026-05-28", status: "terminado" },
  { id: "3", name: "Pérgola antisísmica", customer: "Corporación XYZ", delivery_date: "2026-06-10", status: "en_produccion" },
]

const MOCK_NOTIFICATIONS = [
  { type: "stock", msg: "Stock bajo: Resina Epóxica Cristal (solo 15kg)", href: "/admin/inventario" },
  { type: "quote", msg: "3 cotizaciones pendientes de revisión", href: "/admin/cotizaciones" },
  { type: "invoice", msg: "Factura FAC-000003 vence en 2 días", href: "/admin/facturacion" },
]

interface KPICardProps {
  title: string
  value: string
  change?: number
  icon: React.ReactNode
  color: string
  href?: string
}

function KPICard({ title, value, change, icon, color, href }: KPICardProps) {
  const content = (
    <Card className="hover:shadow-md transition-shadow cursor-default">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--muted-foreground)] mb-1">{title}</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center gap-1 text-xs mt-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(change)}% vs mes anterior
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (href) return <Link href={href}>{content}</Link>
  return content
}

export default function AdminDashboard() {
  const currentMonth = MOCK_MONTHLY_DATA[MOCK_MONTHLY_DATA.length - 1]
  const prevMonth = MOCK_MONTHLY_DATA[MOCK_MONTHLY_DATA.length - 2]
  const revenueChange = Math.round(((currentMonth.ingresos - prevMonth.ingresos) / prevMonth.ingresos) * 100)
  const yearlyRevenue = MOCK_MONTHLY_DATA.reduce((sum, m) => sum + m.ingresos, 0)

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
          <p className="text-[var(--muted-foreground)] text-sm">
            Bienvenido al Panel CEO de Taller Ancestral
          </p>
        </div>
        <div className="text-sm text-[var(--muted-foreground)] hidden sm:block">
          {new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Notificaciones */}
      {MOCK_NOTIFICATIONS.length > 0 && (
        <div className="space-y-2">
          {MOCK_NOTIFICATIONS.map((notif, i) => (
            <Link key={i} href={notif.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-opacity hover:opacity-80 ${
                notif.type === "stock" ? "bg-red-50 text-red-800 border border-red-200" :
                notif.type === "invoice" ? "bg-yellow-50 text-yellow-800 border border-yellow-200" :
                "bg-blue-50 text-blue-800 border border-blue-200"
              }`}>
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                {notif.msg}
                <ArrowRight className="h-3 w-3 ml-auto flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Ingresos del mes"
          value={formatCLP(currentMonth.ingresos)}
          change={revenueChange}
          icon={<DollarSign className="h-5 w-5 text-white" />}
          color="bg-[var(--primary)]"
          href="/admin/facturacion"
        />
        <KPICard
          title="Cotizaciones pendientes"
          value="8"
          icon={<FileText className="h-5 w-5 text-white" />}
          color="bg-blue-600"
          href="/admin/cotizaciones"
        />
        <KPICard
          title="Proyectos activos"
          value="5"
          icon={<Kanban className="h-5 w-5 text-white" />}
          color="bg-purple-600"
          href="/admin/proyectos"
        />
        <KPICard
          title="Alertas de stock"
          value="3"
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          color="bg-red-600"
          href="/admin/inventario"
        />
        <KPICard
          title="Ingresos del año"
          value={formatCLP(yearlyRevenue)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="bg-green-600"
        />
        <KPICard
          title="Clientes nuevos (mes)"
          value="4"
          icon={<Users className="h-5 w-5 text-white" />}
          color="bg-[var(--accent)]"
          href="/admin/clientes"
        />
        <KPICard
          title="Gastos del mes"
          value={formatCLP(currentMonth.gastos)}
          icon={<Package className="h-5 w-5 text-white" />}
          color="bg-orange-600"
          href="/admin/gastos"
        />
        <KPICard
          title="Margen del mes"
          value={`${Math.round(((currentMonth.ingresos - currentMonth.gastos) / currentMonth.ingresos) * 100)}%`}
          icon={<CheckCircle2 className="h-5 w-5 text-white" />}
          color="bg-teal-600"
        />
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ingresos vs Gastos (2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MOCK_MONTHLY_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value) => [formatCLP(Number(value))]}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Legend />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#5c3d1e" fill="#5c3d1e20" strokeWidth={2} />
                <Area type="monotone" dataKey="gastos" name="Gastos" stroke="#c9a84c" fill="#c9a84c20" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas entregas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_UPCOMING.map((project) => {
              const daysLeft = Math.ceil(
                (new Date(project.delivery_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <div key={project.id} className="flex items-start gap-3 p-3 bg-[var(--muted)] rounded-lg">
                  <Clock className={`h-4 w-4 mt-0.5 flex-shrink-0 ${daysLeft <= 3 ? "text-red-600" : daysLeft <= 7 ? "text-yellow-600" : "text-green-600"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-[var(--foreground)] truncate">{project.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{project.customer}</div>
                    <div className={`text-xs font-medium mt-0.5 ${daysLeft <= 3 ? "text-red-600" : daysLeft <= 7 ? "text-yellow-600" : "text-green-600"}`}>
                      {formatDate(project.delivery_date)} ({daysLeft > 0 ? `${daysLeft} días` : "HOY"})
                    </div>
                  </div>
                </div>
              )
            })}
            <Link href="/admin/proyectos" className="block">
              <button className="w-full text-sm text-[var(--accent)] hover:underline flex items-center justify-center gap-1 py-2">
                Ver todos los proyectos <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Ventas por mes (barras) + Top accesos rápidos */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ingresos por mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_MONTHLY_DATA} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [formatCLP(Number(value))]} />
                <Bar dataKey="ingresos" name="Ingresos" fill="#5c3d1e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/admin/cotizaciones", label: "Nueva cotización", icon: "📄" },
              { href: "/admin/facturacion", label: "Nueva factura", icon: "🧾" },
              { href: "/admin/clientes", label: "Agregar cliente", icon: "👤" },
              { href: "/admin/proyectos", label: "Nuevo proyecto", icon: "🔨" },
              { href: "/admin/gastos", label: "Registrar gasto", icon: "💸" },
              { href: "/admin/inventario", label: "Movimiento inventario", icon: "📦" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer group">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)]">
                    {item.label}
                  </span>
                  <ArrowRight className="h-3 w-3 ml-auto text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
