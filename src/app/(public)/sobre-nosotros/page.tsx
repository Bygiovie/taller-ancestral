import Link from "next/link"
import { ArrowRight, Award, Heart, Mountain, Shield } from "lucide-react"
import { TECHNIQUES } from "@/lib/constants"

export const metadata = {
  title: "Sobre Nosotros",
  description: "Conoce la historia del Taller Ancestral, el maestro artesano y nuestra filosofía de fusión de técnicas ancestrales.",
}

export default function SobreNosotrosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-[#1c1410] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4">
                Nuestra Historia
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                El alma detrás de cada pieza
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Taller Ancestral nació de la pasión por fusionar técnicas que normalmente se mantienen separadas. Aquí, carpintería, herrería, resina, vitral, cerámica y construcción conviven en un solo espacio creativo en el corazón de Ovalle.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-2xl flex items-center justify-center">
                <div className="text-[120px]">🏭</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--accent)] text-[var(--accent-foreground)] p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm">Proyectos entregados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historia */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-8">La historia del maestro artesano</h2>

          <div className="prose prose-stone max-w-none space-y-6 text-[var(--muted-foreground)] text-lg leading-relaxed">
            <p>
              Todo comenzó con un clavo y un trozo de madera. Desde niño, el trabajo manual fue el lenguaje en el que mejor me expresé. A lo largo de los años, fui aprendiendo y perfeccionando cada técnica: primero la carpintería, luego la soldadura y herrería, después la construcción antisísmica.
            </p>
            <p>
              La vida me llevó a explorar terrenos inhóspitos, a construir con lo que la tierra daba, a sobrevivir con la inteligencia de las manos. Esa experiencia en el entorno natural del norte de Chile moldeó mi filosofía: <strong className="text-[var(--foreground)]">la mejor artesanía es la que respeta la naturaleza de cada material</strong>.
            </p>
            <p>
              La resina epóxica llegó como una revelación. Poder capturar la esencia de la madera, del río, de los minerales del Valle del Elqui en una pieza duradera fue transformador. Luego vinieron los vitrales —esa técnica centenaria donde la luz se vuelve protagonista— y la cerámica con pigmentos naturales de la tierra local.
            </p>
            <p>
              Hoy, el Taller Ancestral en Ovalle es más que un taller: es el resultado de décadas de aprendizaje continuo, de certificaciones y de la convicción de que cuando amas lo que haces, cada pieza se convierte en una obra de arte funcional.
            </p>
          </div>
        </div>
      </section>

      {/* Técnicas */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">6 Técnicas Dominadas</h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Lo que normalmente requiere 6 artesanos especializados, en Taller Ancestral lo encontrarás en un solo espacio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNIQUES.map((tec) => (
              <div
                key={tec.id}
                className="bg-white p-8 rounded-2xl border border-[var(--border)] hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{tec.icon}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{tec.label}</h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {tec.id === "carpinteria" && "Trabajamos maderas nativas del Valle del Elqui, eucalipto, pino seco y maderas de importación. Cada veta cuenta su propia historia."}
                  {tec.id === "soldadura" && "Soldadura MIG, TIG y electrodo. Estructuras metálicas con diseño industrial y acabados artesanales que duran décadas."}
                  {tec.id === "resina" && "Certificados en manipulación de resina epóxica. Más de 50 pigmentos, incrustaciones y técnicas de capas para efectos únicos."}
                  {tec.id === "vitral" && "Técnica Tiffany y emplomada. Vidrios de colores, texturas y opacidades que transforman la luz en arte."}
                  {tec.id === "ceramica" && "Arcilla nativa del norte de Chile con pigmentos naturales. Piezas con el carácter mineral del desierto costero."}
                  {tec.id === "construccion" && "Formación en construcción antisísmica certificada. Estructuras que cumplen normativas y duran generaciones en la sismicidad chilena."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-8">Nuestra Filosofía</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Heart className="h-6 w-6" />,
                    title: "Pasión por lo Artesanal",
                    desc: "No producimos en serie. Cada pieza es diseñada y ejecutada con atención absoluta al detalle.",
                  },
                  {
                    icon: <Mountain className="h-6 w-6" />,
                    title: "Inspiración Local",
                    desc: "Los colores del desierto costero, las texturas del Valle del Elqui y los minerales del norte de Chile son nuestra paleta.",
                  },
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Construcción para Durar",
                    desc: "Construimos pensando en generaciones. La calidad de materiales y técnicas garantiza piezas que duran décadas.",
                  },
                  {
                    icon: <Award className="h-6 w-6" />,
                    title: "Mejora Continua",
                    desc: "Nos certificamos constantemente y exploramos nuevas técnicas para ofrecer siempre lo mejor del oficio.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--foreground)] mb-1">{item.title}</h4>
                      <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--muted)] rounded-2xl p-10">
              <blockquote className="text-2xl font-bold text-[var(--foreground)] leading-relaxed mb-6 italic">
                &ldquo;El resultado de combinar técnicas que normalmente requerirían 5 artesanos diferentes: muebles y objetos únicos, imposibles de replicar industrialmente.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  M
                </div>
                <div>
                  <div className="font-bold text-[var(--foreground)]">El Maestro</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Fundador, Taller Ancestral</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Te gustaría que creemos algo juntos?</h2>
          <p className="text-white/70 text-lg mb-10">
            Cuéntanos tu idea y te mostramos cómo la convertimos en una pieza única.
          </p>
          <Link href="/proyectos-personalizados">
            <button className="bg-[var(--accent)] text-[var(--accent-foreground)] px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Iniciar un Proyecto
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
