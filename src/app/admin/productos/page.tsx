"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCLP } from "@/lib/utils"
import { SAMPLE_PRODUCTS, CATEGORIES, TECHNIQUES } from "@/lib/constants"

const TECHNIQUE_ICONS: Record<string, string> = {
  carpinteria: "🪵", soldadura: "🔥", resina: "✨", vitral: "🎨", ceramica: "🏺", construccion: "🏗️",
}

export default function ProductosPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || p.category_id === categoryFilter
    return matchSearch && matchCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Productos</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{SAMPLE_PRODUCTS.length} productos en catálogo</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo Producto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Total productos</div>
          <div className="text-2xl font-bold text-[var(--foreground)]">{SAMPLE_PRODUCTS.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Visibles en web</div>
          <div className="text-2xl font-bold text-green-600">{SAMPLE_PRODUCTS.filter((p) => p.is_visible).length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Destacados</div>
          <div className="text-2xl font-bold text-[var(--accent)]">{SAMPLE_PRODUCTS.filter((p) => p.is_featured).length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-xs text-[var(--muted-foreground)] uppercase font-medium mb-1">Categorías</div>
          <div className="text-2xl font-bold text-[var(--foreground)]">{CATEGORIES.length}</div>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                placeholder="Buscar producto o SKU..."
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
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => {
          const category = CATEGORIES.find((c) => c.id === product.category_id)
          const margin = Math.round(((product.base_price - product.material_cost) / product.base_price) * 100)
          return (
            <div key={product.id} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10 relative">
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
                  {TECHNIQUE_ICONS[product.techniques[0]] ?? "🪵"}
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.is_featured && (
                    <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" /> Destacado
                    </span>
                  )}
                  {!product.is_visible && (
                    <span className="bg-gray-800/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <EyeOff className="h-3 w-3" /> Oculto
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[var(--muted-foreground)] font-mono">{product.sku}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{category?.icon} {category?.name}</span>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-2 line-clamp-2">{product.name}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {product.techniques.map((t) => (
                    <span key={t} className="text-base" title={t}>{TECHNIQUE_ICONS[t]}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <div className="text-[var(--muted-foreground)]">Precio</div>
                    <div className="font-bold text-[var(--primary)]">{formatCLP(product.base_price)}</div>
                  </div>
                  <div>
                    <div className="text-[var(--muted-foreground)]">Margen</div>
                    <div className="font-bold text-green-600">{margin}%</div>
                  </div>
                  <div>
                    <div className="text-[var(--muted-foreground)]">Costo mat.</div>
                    <div className="font-semibold text-[var(--foreground)]">{formatCLP(product.material_cost)}</div>
                  </div>
                  <div>
                    <div className="text-[var(--muted-foreground)]">Producción</div>
                    <div className="font-semibold text-[var(--foreground)]">{product.production_days}d</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[var(--muted)] rounded-lg text-xs font-medium hover:bg-[var(--secondary)] transition-colors flex items-center justify-center gap-1">
                    <Edit className="h-3.5 w-3.5" /> Editar
                  </button>
                  <button className="p-2 hover:bg-[var(--muted)] rounded-lg" title={product.is_visible ? "Ocultar de web" : "Mostrar en web"}>
                    {product.is_visible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {/* Agregar nuevo */}
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)] transition-colors min-h-[280px] group">
          <Plus className="h-8 w-8 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] mb-2" />
          <span className="text-sm font-medium text-[var(--muted-foreground)] group-hover:text-[var(--primary)]">
            Agregar producto
          </span>
        </button>
      </div>
    </div>
  )
}
