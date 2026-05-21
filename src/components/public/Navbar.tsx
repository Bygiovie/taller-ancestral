"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS, CATEGORIES } from "@/lib/constants"

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/proceso", label: "Proceso" },
  { href: "/proyectos-personalizados", label: "Proyectos" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1410] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center font-bold text-[var(--accent-foreground)] text-lg group-hover:scale-105 transition-transform">
              TA
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight tracking-wide">
                TALLER ANCESTRAL
              </div>
              <div className="text-[var(--accent)] text-xs tracking-widest uppercase">
                Manufactura Artesanal
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-[var(--accent)] hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=Hola, me gustaría solicitar una cotización`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/80 hover:text-[var(--accent)] transition-colors"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.whatsapp}
            </a>
            <Link href="/proyectos-personalizados">
              <Button size="sm" className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90">
                Cotizar
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#1c1410]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-white/80 hover:text-[var(--accent)] hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link href="/proyectos-personalizados" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[var(--accent)] text-[var(--accent-foreground)]">
                  Solicitar Cotización
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
