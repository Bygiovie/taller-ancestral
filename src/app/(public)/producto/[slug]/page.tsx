import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Ruler, Package, CheckCircle2, Share2, MessageCircle } from "lucide-react"
import { SAMPLE_PRODUCTS, TECHNIQUES, CATEGORIES, BUSINESS } from "@/lib/constants"
import { formatCLP } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.short_description,
  }
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const category = CATEGORIES.find((c) => c.id === product.category_id)
  const relatedProducts = SAMPLE_PRODUCTS.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 3)
  const productTechniques = TECHNIQUES.filter((t) => product.techniques.includes(t.id))
  const whatsappMsg = `Hola! Me interesa cotizar: ${product.name}. ¿Podrían darme más información?`

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="hover:text-[var(--foreground)]">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[var(--foreground)]">Catálogo</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/catalogo/${category.slug}`} className="hover:text-[var(--foreground)]">{category.name}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-[var(--foreground)] font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galería */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10">
                {product.techniques.includes("resina") ? "✨" :
                 product.techniques.includes("vitral") ? "🎨" :
                 product.techniques.includes("soldadura") ? "🔥" : "🪵"}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
                Foto de referencia
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/5 rounded-lg cursor-pointer border-2 border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <Link
                  href={`/catalogo/${category.slug}`}
                  className="text-sm text-[var(--accent)] font-medium hover:underline"
                >
                  {category.icon} {category.name}
                </Link>
              )}
              {product.is_featured && (
                <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-2 py-0.5 rounded-full">
                  Destacado
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">{product.name}</h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
              {product.short_description}
            </p>

            {/* Técnicas */}
            <div className="flex flex-wrap gap-2 mb-6">
              {productTechniques.map((tec) => (
                <span
                  key={tec.id}
                  className="flex items-center gap-1.5 bg-[var(--muted)] text-[var(--foreground)] px-3 py-1.5 rounded-full text-sm"
                >
                  {tec.icon} {tec.label}
                </span>
              ))}
            </div>

            {/* Precio */}
            <div className="bg-[var(--muted)] rounded-xl p-6 mb-6">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Precio desde</div>
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                {formatCLP(product.base_price)}
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">
                El precio final varía según personalización y materiales específicos
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--border)]">
                <Clock className="h-5 w-5 text-[var(--accent)]" />
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Producción</div>
                  <div className="font-semibold text-[var(--foreground)]">{product.production_days} días</div>
                </div>
              </div>
              {product.dimensions && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--border)]">
                  <Ruler className="h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">Dimensiones</div>
                    <div className="font-semibold text-[var(--foreground)] text-sm">{product.dimensions}</div>
                  </div>
                </div>
              )}
              {product.materials && (
                <div className="col-span-2 flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--border)]">
                  <Package className="h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">Materiales</div>
                    <div className="font-semibold text-[var(--foreground)] text-sm">{product.materials}</div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href="/proyectos-personalizados" className="flex-1">
                <button className="w-full bg-[var(--primary)] text-white px-6 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Cotizar Este Producto
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full bg-[#25D366] text-white px-6 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </button>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" /> Personalización incluida
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" /> Despacho a todo Chile
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" /> Garantía de calidad
              </div>
            </div>
          </div>
        </div>

        {/* Descripción larga */}
        <div className="mt-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Descripción</h2>
            <div className="prose prose-stone max-w-none">
              <p className="text-[var(--muted-foreground)] leading-relaxed text-base">
                {product.long_description}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Personalización</h3>
              <ul className="space-y-3">
                {[
                  "Dimensiones adaptadas a tu espacio",
                  "Colores de resina a elección (más de 50 opciones)",
                  "Tipo y especie de madera",
                  "Acabado metálico: negro mate, cobre, acero natural",
                  "Detalles adicionales y grabados",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--foreground)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Proceso de compra</h3>
            <div className="space-y-4">
              {[
                { n: "1", t: "Cotización", d: "Solicita precio con tus medidas" },
                { n: "2", t: "Aprobación", d: "Revisas y apruebas el diseño" },
                { n: "3", t: "Anticipo 50%", d: "Confirmación y inicio producción" },
                { n: "4", t: "Producción", d: `${product.production_days} días aproximados` },
                { n: "5", t: "Entrega", d: "Embalado y despachado a tu domicilio" },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)] text-sm">{step.t}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/producto/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-xl transition-all"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10" />
                  <div className="p-4">
                    <h4 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">{related.name}</h4>
                    <div className="font-bold text-[var(--primary)] mt-2">{formatCLP(related.base_price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
