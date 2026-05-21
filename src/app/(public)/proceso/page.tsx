import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { TECHNIQUES } from "@/lib/constants"

export const metadata = {
  title: "Proceso Artesanal",
  description: "Descubre cómo creamos cada pieza artesanal en Taller Ancestral, desde la idea hasta la entrega.",
}

const PROCESS_STEPS = [
  {
    phase: "01",
    title: "Consulta inicial",
    duration: "Día 1",
    description: "El cliente describe su proyecto: dimensiones, uso, colores de preferencia, presupuesto aproximado y plazo deseado. Esta información es el punto de partida.",
    actions: ["Reunión presencial o videollamada", "Análisis de referencias visuales", "Evaluación de viabilidad técnica", "Identificación de técnicas necesarias"],
    techniques: [],
  },
  {
    phase: "02",
    title: "Diseño y propuesta",
    duration: "Días 2-4",
    description: "Creamos bocetos, renders o planos técnicos según la complejidad del proyecto. Se definen materiales exactos, combinación de técnicas y acabados.",
    actions: ["Bocetos a mano o digital", "Selección de maderas y materiales", "Definición de colores de resina", "Confirmación de medidas exactas"],
    techniques: [],
  },
  {
    phase: "03",
    title: "Cotización formal",
    duration: "Días 4-5",
    description: "Se emite una cotización detallada con precios desglosados, condiciones de pago, tiempo de producción garantizado y términos claros.",
    actions: ["Cotización con ítems desglosados", "Plazo de entrega comprometido", "Condiciones de pago (50%/50%)", "Validez de 15 días hábiles"],
    techniques: [],
  },
  {
    phase: "04",
    title: "Producción: preparación",
    duration: "Semana 1",
    description: "Con el anticipo recibido, se compran los materiales específicos, se prepara el espacio de trabajo y se traza el diseño sobre los materiales.",
    actions: ["Compra de materiales seleccionados", "Corte y preparación de madera", "Doblado y corte de metales", "Preparación de superficies"],
    techniques: ["carpinteria", "soldadura"],
  },
  {
    phase: "05",
    title: "Producción: manufactura",
    duration: "Semanas 2-3",
    description: "La fase principal de creación. Según el tipo de producto, se trabajan simultáneamente las diferentes técnicas: soldadura de estructuras, trabajo en madera, aplicación de resina.",
    actions: ["Soldadura y forjado de metales", "Ensamblaje de madera", "Aplicación de capas de resina", "Creación de elementos vitral o cerámica"],
    techniques: ["carpinteria", "soldadura", "resina", "vitral", "ceramica"],
  },
  {
    phase: "06",
    title: "Acabados y control de calidad",
    duration: "Días finales",
    description: "Se realizan los acabados finales: lijado, pintura, lacado, pulido de resina. Control exhaustivo de calidad antes de la entrega.",
    actions: ["Lijado progresivo (grano 80-3000)", "Pulido y lustrado de resina", "Pintura o lacado de metales", "Revisión final de calidad"],
    techniques: ["construccion"],
  },
  {
    phase: "07",
    title: "Entrega y seguimiento",
    duration: "Entrega",
    description: "Embalaje profesional con materiales protectores, despacho seguro a todo Chile o retiro en taller. Se entrega certificado de autenticidad y guía de cuidados.",
    actions: ["Documentación fotográfica final", "Embalaje con materiales especiales", "Coordinación de despacho", "Envío de guía de cuidados"],
    techniques: [],
  },
]

const TECHNIQUE_DETAILS = [
  {
    id: "carpinteria",
    title: "Carpintería en Madera",
    icon: "🪵",
    description: "Trabajamos con maderas nativas del Valle del Elqui, eucalipto, pino seco, roble y maderas de importación. Cada veta es única.",
    tips: ["Siempre usamos madera seca y aclimatada", "Seleccionamos manualmente cada pieza", "Respetamos la veta natural de la madera"],
  },
  {
    id: "soldadura",
    title: "Soldadura y Herrería",
    icon: "🔥",
    description: "Soldadura MIG, TIG y electrodo. Estructuras de fierro cuadrado, redondo, ángulos y platinas con diseño industrial.",
    tips: ["Corte con plasma y disco", "Doblado en frío y en caliente", "Acabado con antioxidante e pintura epóxica"],
  },
  {
    id: "resina",
    title: "Resina Epóxica",
    icon: "✨",
    description: "Certificados en manipulación de resina. Trabajamos con resina de cristal para mesas de río, encapsulados y acabados.",
    tips: ["Más de 50 pigmentos disponibles", "Proceso de curado de 48-72 horas", "Pulido hasta grano 3000 + pulimento final"],
  },
  {
    id: "vitral",
    title: "Vitrales Artísticos",
    icon: "🎨",
    description: "Técnica Tiffany con papel de cobre y soldadura de estaño. Vidrios de colores, texturas y opacidades.",
    tips: ["Diseños únicos para cada pieza", "Vidrios importados de alta calidad", "Estructuras de soporte en fierro negro"],
  },
]

export default function ProcesoPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-[#1c1410] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">El Proceso Artesanal</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Cada pieza pasa por un proceso meticuloso de 7 etapas. Transparencia total desde la idea hasta tu espacio.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-12">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.phase} className="grid md:grid-cols-5 gap-6 items-start">
              {/* Número + línea */}
              <div className="md:col-span-1 flex md:flex-col items-center md:items-end gap-4">
                <div className="w-14 h-14 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {step.phase}
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block w-px h-20 bg-[var(--border)] ml-auto mr-0" style={{ marginRight: "26px" }} />
                )}
              </div>

              {/* Contenido */}
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{step.title}</h3>
                  <span className="text-sm text-[var(--accent)] font-medium bg-[var(--accent)]/10 px-3 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">{step.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {step.actions.map((action) => (
                    <li key={action} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
                {step.techniques.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {step.techniques.map((t) => {
                      const tec = TECHNIQUES.find((tech) => tech.id === t)
                      return tec ? (
                        <span key={t} className="text-lg" title={tec.label}>{tec.icon}</span>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Técnicas detalladas */}
      <div className="bg-[var(--muted)] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Las técnicas en detalle
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TECHNIQUE_DETAILS.map((tec) => (
              <div key={tec.id} className="bg-white p-8 rounded-2xl border border-[var(--border)]">
                <div className="text-4xl mb-4">{tec.icon}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{tec.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">{tec.description}</p>
                <ul className="space-y-2">
                  {tec.tips.map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                      <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-[var(--primary)] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">¿Listo para comenzar tu proyecto?</h2>
          <p className="text-white/70 text-lg mb-8">La primera consulta es completamente gratuita</p>
          <Link href="/proyectos-personalizados">
            <button className="bg-[var(--accent)] text-[var(--accent-foreground)] px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Solicitar Cotización <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
