import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import { CATEGORIES, SAMPLE_PRODUCTS, TECHNIQUES } from "@/lib/constants"
import { formatCLP } from "@/lib/utils"

export const metadata = {
  title: "Catálogo de Productos Artesanales",
  description: "Explora nuestro catálogo de mobiliario premium, iluminación artística, elementos arquitectónicos y más.",
}

export default function CatalogoPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-[#1c1410] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Catálogo Artesanal</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Cada pieza es única e irrepetible. Encuentra tu próximo objeto de diseño o solicita un proyecto personalizado.
          </p>
        </div>
      </div>

      {/* Filtros por técnica */}
      <div className="bg-white border-b border-[var(--border)] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-4 w-4 text-[var(--muted-foreground)] flex-shrink-0" />
          <span className="text-sm text-[var(--muted-foreground)] flex-shrink-0">Filtrar por técnica:</span>
          <button className="flex-shrink-0 px-3 py-1.5 bg-[var(--primary)] text-white text-xs rounded-full font-medium">
            Todos
          </button>
          {TECHNIQUES.map((tec) => (
            <button
              key={tec.id}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--muted)] text-[var(--foreground)] text-xs rounded-full hover:bg-[var(--secondary)] transition-colors"
            >
              {tec.icon} {tec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categorías */}
        {CATEGORIES.map((cat) => {
          const products = SAMPLE_PRODUCTS.filter((p) => p.category_id === cat.id)
          if (products.length === 0) return null

          return (
            <div key={cat.id} className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--foreground)]">{cat.name}</h2>
                    <p className="text-[var(--muted-foreground)] text-sm">{cat.description}</p>
                  </div>
                </div>
                <Link
                  href={`/catalogo/${cat.slug}`}
                  className="hidden sm:flex items-center gap-2 text-sm text-[var(--accent)] font-medium hover:gap-3 transition-all"
                >
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {/* Placeholder cards para la categoría */}
                <Link
                  href={`/catalogo/${cat.slug}`}
                  className="group flex flex-col items-center justify-center p-8 bg-[var(--muted)] rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] transition-colors min-h-[300px]"
                >
                  <div className="text-4xl mb-3 opacity-40">{cat.icon}</div>
                  <div className="text-[var(--muted-foreground)] text-sm text-center mb-3">
                    Ver todos los productos de {cat.name}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-medium group-hover:gap-3 transition-all">
                    Explorar <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            </div>
          )
        })}

        {/* Sección sin categoría */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Más del Catálogo</h2>
              <p className="text-[var(--muted-foreground)] text-sm">Piezas adicionales de nuestro taller</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS.filter((p) => !SAMPLE_PRODUCTS.slice(0, 4).includes(p)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--primary)] rounded-2xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-white/70 mb-8 text-lg">
            Diseñamos y fabricamos cualquier pieza según tus especificaciones. Sin límites creativos.
          </p>
          <Link href="/proyectos-personalizados">
            <button className="bg-[var(--accent)] text-[var(--accent-foreground)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Proyectos Personalizados <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: typeof SAMPLE_PRODUCTS[0] }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10 relative">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-15">
          {product.techniques.includes("resina") ? "✨" :
           product.techniques.includes("vitral") ? "🎨" :
           product.techniques.includes("soldadura") ? "🔥" : "🪵"}
        </div>
        {product.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-2.5 py-1 rounded-full">
              Destacado
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-1 mb-3">
          {product.techniques.map((t) => (
            <span key={t} className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full capitalize">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-[var(--foreground)] text-base mb-1 group-hover:text-[var(--primary)] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4 line-clamp-2">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--muted-foreground)]">Desde</div>
            <div className="font-bold text-[var(--primary)]">{formatCLP(product.base_price)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[var(--muted-foreground)]">Producción</div>
            <div className="text-sm font-medium text-[var(--foreground)]">{product.production_days} días</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
