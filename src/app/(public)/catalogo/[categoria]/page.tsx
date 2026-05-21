import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CATEGORIES, SAMPLE_PRODUCTS } from "@/lib/constants"
import { formatCLP } from "@/lib/utils"

interface PageProps {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ categoria: cat.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { categoria } = await params
  const cat = CATEGORIES.find((c) => c.slug === categoria)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.description,
  }
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  const cat = CATEGORIES.find((c) => c.slug === categoria)
  if (!cat) notFound()

  const products = SAMPLE_PRODUCTS.filter((p) => p.category_id === cat.id)

  return (
    <div className="pt-20">
      <div className="bg-[#1c1410] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{cat.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-white">{cat.name}</h1>
              <p className="text-white/60 mt-2 max-w-2xl">{cat.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-15">
                    {cat.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mb-4 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[var(--primary)]">{formatCLP(product.base_price)}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{product.production_days} días</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Productos próximamente</h3>
            <p className="text-[var(--muted-foreground)] mb-8">
              Esta categoría se está actualizando con nuevos productos.
            </p>
            <Link href="/proyectos-personalizados">
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 inline-flex items-center gap-2">
                Solicitar proyecto personalizado <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-[var(--muted)] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            ¿Necesitas algo a medida en {cat.name}?
          </h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Diseñamos según tus especificaciones exactas. Cuéntanos tu idea.
          </p>
          <Link href="/proyectos-personalizados">
            <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 inline-flex items-center gap-2">
              Proyectos Personalizados <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
