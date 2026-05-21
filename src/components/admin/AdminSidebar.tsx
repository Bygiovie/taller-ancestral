"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Receipt,
  Users,
  Package,
  Kanban,
  Warehouse,
  DollarSign,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/cotizaciones", label: "Cotizaciones", icon: FileText },
  { href: "/admin/facturacion", label: "Facturación", icon: Receipt },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/proyectos", label: "Proyectos", icon: Kanban },
  { href: "/admin/inventario", label: "Inventario", icon: Warehouse },
  { href: "/admin/gastos", label: "Gastos", icon: DollarSign },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin/calendario", label: "Calendario", icon: Calendar },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-[var(--sidebar-border)]",
        collapsed && "justify-center"
      )}>
        <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center font-bold text-[var(--accent-foreground)] text-sm flex-shrink-0">
          TA
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">Taller Ancestral</div>
            <div className="text-[var(--accent)] text-xs">Panel CEO</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex ml-auto text-white/40 hover:text-white transition-colors"
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm group",
                active
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--sidebar-border)]">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white text-sm transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Ver sitio web</span>}
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#1c1410] text-white rounded-lg flex items-center justify-center shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-[var(--sidebar-bg)] transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-[var(--sidebar-bg)] transition-all duration-300 border-r border-[var(--sidebar-border)]",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
      </div>
    </>
  )
}
