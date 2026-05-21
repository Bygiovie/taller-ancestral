import Link from "next/link"
import { ArrowRight, Award, Hammer, Zap, Star, CheckCircle2, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CATEGORIES, TECHNIQUES, SAMPLE_PRODUCTS } from "@/lib/constants"
import { formatCLP } from "@/lib/utils"
import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"

export const metadata = {
  title: "Taller Ancestral - Manufactura Artesanal de Alto Diseño",
  description: "Fusionamos 6 técnicas ancestrales en piezas únicas para tu espacio. Carpintería, soldadura, resina epóxica, vitrales, cerámica y construcción. Ovalle, Coquimbo, Chile.",
}

export default function RootPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* HERO */}
        <section className="relative min-h-screen bg-[#1c1410] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 60px)` }} />
          </div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Award className="h-4 w-4" />
              Maestro Artesano Certificado — Ovalle, Coquimbo
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-none mb-6">
              Manufactura<br />
              <span className="text-[var(--accent)]">Artesanal</span><br />
              de Alto Diseño
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Fusionamos <strong className="text-white">6 técnicas ancestrales</strong> en piezas únicas e irrepetibles para tu espacio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/catalogo">
                <Button size="xl" className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 font-semibold">
                  Explorar Catálogo <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/proyectos-personalizados">
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Solicitar Cotización
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[{ num: "6+", label: "Técnicas" }, { num: "200+", label: "Proyectos" }, { num: "100%", label: "Artesanal" }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent)]">{s.num}</div>
                  <div className="text-white/50 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TÉCNICAS */}
        <section className="py-24 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                6 Técnicas Ancestrales, <span className="text-[var(--accent)]">1 Maestro Artesano</span>
              </h2>
              <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
                No subcontratamos. Cada pieza se crea completamente en nuestro taller.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {TECHNIQUES.map((tec) => (
                <div key={tec.id} className="group p-6 bg-white rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 text-center cursor-default">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tec.icon}</div>
                  <div className="text-sm font-medium text-[var(--foreground)] leading-tight">{tec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="py-24 bg-[#1c1410] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4">Por qué somos únicos</div>
                <h2 className="text-4xl font-bold mb-6 leading-tight">Piezas imposibles de replicar industrialmente</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  El resultado de combinar 6 técnicas en un solo taller: muebles y objetos únicos con alma propia.
                </p>
                <ul className="space-y-4">
                  {["Diseño personalizado para cada cliente", "Materiales premium seleccionados a mano", "Certificación en resina epóxica y construcción antisísmica", "Garantía de durabilidad: piezas para generaciones", "Despacho en la IV Región de Coquimbo"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link href="/sobre-nosotros">
                    <Button className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90">
                      Conoce nuestra historia <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Hammer className="h-6 w-6" />, title: "100% Artesanal", desc: "Cada pieza creada a mano, sin producción en serie" },
                  { icon: <Star className="h-6 w-6" />, title: "Premium Quality", desc: "Materiales de primera con procesos certificados" },
                  { icon: <Clock className="h-6 w-6" />, title: "A Tu Medida", desc: "Diseñamos según tus dimensiones exactas" },
                  { icon: <Users className="h-6 w-6" />, title: "Clientes Felices", desc: "Más de 200 proyectos entregados" },
                  { icon: <Zap className="h-6 w-6" />, title: "Entrega Segura", desc: "Embalaje profesional y despacho cuidadoso" },
                  { icon: <Award className="h-6 w-6" />, title: "Certificados", desc: "Maestro certificado en múltiples técnicas" },
                ].map((f) => (
                  <div key={f.title} className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-[var(--accent)]/50 transition-colors">
                    <div className="text-[var(--accent)] mb-3">{f.icon}</div>
                    <div className="font-semibold text-white mb-1">{f.title}</div>
                    <div className="text-white/50 text-sm leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="py-24 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">Nuestro Catálogo</h2>
              <p className="text-[var(--muted-foreground)] text-lg">Explora nuestras 6 categorías de productos artesanales</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/catalogo/${cat.slug}`} className="group relative p-8 bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--accent)]/10 transition-colors" />
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{cat.name}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-medium">
                    Ver productos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="py-24 bg-[var(--muted)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-[var(--foreground)]">Productos Destacados</h2>
                <p className="text-[var(--muted-foreground)] mt-2">Nuestras piezas más admiradas</p>
              </div>
              <Link href="/catalogo"><Button variant="outline">Ver todo</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SAMPLE_PRODUCTS.slice(0, 4).map((product) => (
                <Link key={product.id} href={`/producto/${product.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-[#5c3d1e]/10 to-[var(--accent)]/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                      {product.techniques.includes("resina") ? "✨" : product.techniques.includes("vitral") ? "🎨" : product.techniques.includes("soldadura") ? "🔥" : "🪵"}
                    </div>
                    {product.is_featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-semibold px-2 py-1 rounded-full">Destacado</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.techniques.slice(0, 2).map((t) => (
                        <span key={t} className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full capitalize">{t}</span>
                      ))}
                    </div>
                    <h3 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">{product.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)] mb-3 line-clamp-2">{product.short_description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[var(--muted-foreground)]">Desde</div>
                        <div className="font-bold text-[var(--primary)]">{formatCLP(product.base_price)}</div>
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)]">{product.production_days} días</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">Lo que dicen nuestros clientes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "María González", role: "Diseñadora de Interiores, Santiago", text: "La mesa de río que hicieron para mi proyecto superó todas las expectativas. La combinación de madera y resina es impresionante.", stars: 5 },
                { name: "Carlos Vega", role: "Restaurant El Marqués, La Serena", text: "Encargamos 8 mesas y lámparas de vitral. El resultado es increíble, le dio una identidad única al local. Totalmente recomendado.", stars: 5 },
                { name: "Ana Morales", role: "Propietaria, Ovalle", text: "Mi puerta con vitral es la envidia del barrio. La atención personalizada y la calidad del trabajo son excepcionales.", stars: 5 },
              ].map((t) => (
                <div key={t.name} className="bg-[var(--muted)] p-8 rounded-2xl border border-[var(--border)]">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                  <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">{t.name[0]}</div>
                    <div>
                      <div className="font-semibold text-[var(--foreground)] text-sm">{t.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 bg-[var(--primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">¿Tienes un proyecto en mente?</h2>
            <p className="text-xl text-white/70 mb-10">Cuéntanos tu idea. Hacemos realidad piezas únicas que ninguna fábrica puede replicar.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/proyectos-personalizados">
                <Button size="xl" className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 font-semibold">
                  Solicitar Cotización Gratis <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/56912345678?text=Hola! Tengo un proyecto que me gustaría cotizar." target="_blank" rel="noopener noreferrer">
                <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  WhatsApp Directo
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
