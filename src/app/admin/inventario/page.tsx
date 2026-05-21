"use client"

import { useState } from "react"
import { Plus, Search, AlertTriangle, TrendingDown, Package, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCLP, formatDate } from "@/lib/utils"
import { INVENTORY_CATEGORIES } from "@/lib/constants"

const MOCK_INVENTORY = [
  {
    id: "1", name: "Madera Pino Seco 2\"x4\"x3m", code: "MAD-001", category: "Maderas",
    unit: "unidad", current_stock: 50, min_stock: 10, unit_cost: 4500,
    supplier: "Maderería Ovalle", last_purchase_date: "2026-05-01",
  },
  {
    id: "2", name: "Resina Epóxica Cristal 1kg", code: "RES-001", category: "Resina Epóxica",
    unit: "kg", current_stock: 15, min_stock: 5, unit_cost: 18000,
    supplier: "Químicos Coquimbo", last_purchase_date: "2026-04-28",
  },
  {
    id: "3", name: "Pigmento Azul Marino 100g", code: "RES-002", category: "Resina Epóxica",
    unit: "unidad", current_stock: 3, min_stock: 3, unit_cost: 6500,
    supplier: "Químicos Coquimbo", last_purchase_date: "2026-04-15",
  },
  {
    id: "4", name: "Fierro Cuadrado 20x20mm 6m", code: "MET-001", category: "Metales",
    unit: "barra", current_stock: 20, min_stock: 5, unit_cost: 12000,
    supplier: "Metalúrgica Norte", last_purchase_date: "2026-05-05",
  },
  {
    id: "5", name: "Vidrio Tiffany Azul 20x20cm", code: "VID-001", category: "Vidrios",
    unit: "pieza", current_stock: 200, min_stock: 50, unit_cost: 850,
    supplier: "Vitralería Santiago", last_purchase_date: "2026-04-20",
  },
  {
    id: "6", name: "Lija Grano 120", code: "CON-001", category: "Consumibles",
    unit: "unidad", current_stock: 5, min_stock: 20, unit_cost: 350,
    supplier: "Ferreterías Norte", last_purchase_date: "2026-04-10",
  },
  {
    id: "7", name: "Electrodo 3/32\" 1kg", code: "CON-002", category: "Consumibles",
    unit: "kg", current_stock: 5, min_stock: 2, unit_cost: 8500,
    supplier: "Metalúrgica Norte", last_purchase_date: "2026-05-03",
  },
  {
    id: "8", name: "Pintura Anticorrosiva Negra 1L", code: "PIN-001", category: "Pinturas y Acabados",
    unit: "litro", current_stock: 2, min_stock: 3, unit_cost: 12500,
    supplier: "Pinturas Ovalle", last_purchase_date: "2026-04-22",
  },
]

export default function InventarioPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showLowStock, setShowLowStock] = useState(false)

  const filtered = MOCK_INVENTORY.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchLow = !showLowStock || item.current_stock <= item.min_stock
    return matchSearch && matchCategory && matchLow
  })

  const lowStockItems = MOCK_INVENTORY.filter((i) => i.current_stock <= i.min_stock)
  const totalValue = MOCK_INVENTORY.reduce((s, i) => s + i.current_stock * i.unit_cost, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Inventario</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{MOCK_INVENTORY.length} materiales registrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDown className="h-4 w-4" /> Movimiento salida
          </Button>
          <Button>
            <Plus className="h-4 w-4" /> Agregar material
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-xs text-[var(--muted-foreground)] uppercase font-medium">Total materiales</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">{MOCK_INVENTORY.length}</div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm ${lowStockItems.length > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`h-4 w-4 ${lowStockItems.length > 0 ? "text-red-600" : "text-green-600"}`} />
            <span className={`text-xs uppercase font-medium ${lowStockItems.length > 0 ? "text-red-700" : "text-green-700"}`}>Stock bajo</span>
          </div>
          <div className={`text-2xl font-bold ${lowStockItems.length > 0 ? "text-red-800" : "text-green-800"}`}>
            {lowStockItems.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-[var(--accent)]" />
            <span className="text-xs text-[var(--muted-foreground)] uppercase font-medium">Valor total</span>
          </div>
          <div className="text-xl font-bold text-[var(--foreground)]">{formatCLP(totalValue)}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-[var(--muted-foreground)] uppercase font-medium">Categorías</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {new Set(MOCK_INVENTORY.map((i) => i.category)).size}
          </div>
        </div>
      </div>

      {/* Alertas de stock bajo */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-800 font-semibold mb-3">
            <AlertTriangle className="h-5 w-5" />
            Materiales con stock bajo — Reabastece pronto
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-3 border border-red-200">
                <div className="font-medium text-xs text-red-800 mb-1">{item.name}</div>
                <div className="text-sm font-bold text-red-900">{item.current_stock} {item.unit}</div>
                <div className="text-xs text-red-600">Mín: {item.min_stock}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                placeholder="Buscar material o código..."
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
              {INVENTORY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={() => setShowLowStock(!showLowStock)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                showLowStock ? "bg-red-600 text-white" : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              Stock bajo
            </button>
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Material</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden md:table-cell">Categoría</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Stock</th>
                  <th className="text-center px-4 py-3 text-xs font-semibond text-[var(--muted-foreground)] uppercase hidden sm:table-cell">Mínimo</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden lg:table-cell">Costo unit.</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden lg:table-cell">Valor total</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase hidden md:table-cell">Proveedor</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((item) => {
                  const isLow = item.current_stock <= item.min_stock
                  return (
                    <tr key={item.id} className={`hover:bg-[var(--muted)]/50 transition-colors ${isLow ? "bg-red-50/30" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm text-[var(--foreground)]">{item.name}</div>
                        <div className="text-xs font-mono text-[var(--muted-foreground)]">{item.code}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-[var(--foreground)]">{item.category}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`font-bold text-sm ${isLow ? "text-red-600" : "text-[var(--foreground)]"}`}>
                          {item.current_stock} {item.unit}
                        </div>
                        {isLow && (
                          <div className="flex items-center justify-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-500">Stock bajo</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className="text-sm text-[var(--muted-foreground)]">{item.min_stock} {item.unit}</span>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <span className="text-sm text-[var(--foreground)]">{formatCLP(item.unit_cost)}</span>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <span className="font-semibold text-sm text-[var(--foreground)]">
                          {formatCLP(item.current_stock * item.unit_cost)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-[var(--muted-foreground)]">{item.supplier}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors" title="Entrada de material">
                            <ArrowDown className="h-4 w-4 text-green-600" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Salida de material">
                            <ArrowUp className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
