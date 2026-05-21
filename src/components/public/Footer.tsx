import Link from "next/link"
import { MapPin, Phone, Mail, Globe, Share2 } from "lucide-react"
import { BUSINESS, CATEGORIES, TECHNIQUES } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-[#1c1410] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center font-bold text-[var(--accent-foreground)] text-lg">
                TA
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">TALLER ANCESTRAL</div>
                <div className="text-[var(--accent)] text-xs tracking-widest uppercase">Manufactura Artesanal</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Fusionamos 6 técnicas ancestrales en piezas únicas para tu espacio. Carpintería, soldadura, resina, vitrales, cerámica y construcción.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${BUSINESS.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                title="Instagram"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href={`https://facebook.com/${BUSINESS.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                title="Facebook"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Catálogo */}
          <div>
            <h4 className="font-semibold text-[var(--accent)] uppercase tracking-widest text-xs mb-4">
              Catálogo
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogo/${cat.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Técnicas */}
          <div>
            <h4 className="font-semibold text-[var(--accent)] uppercase tracking-widest text-xs mb-4">
              Nuestras Técnicas
            </h4>
            <ul className="space-y-2">
              {TECHNIQUES.map((tec) => (
                <li key={tec.id} className="text-white/60 text-sm flex items-center gap-2">
                  <span>{tec.icon}</span>
                  {tec.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-[var(--accent)] uppercase tracking-widest text-xs mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--accent)] flex-shrink-0" />
                <span>{BUSINESS.city}, {BUSINESS.region}, {BUSINESS.country}</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
                <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}`} className="hover:text-white transition-colors">
                  {BUSINESS.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/proyectos-personalizados"
                className="inline-block bg-[var(--accent)] text-[var(--accent-foreground)] px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Taller Ancestral® — Manufactura Artesanal. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
