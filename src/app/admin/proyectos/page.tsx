"use client"

import { useState } from "react"
import { Plus, Clock, CheckCircle2, Truck, Hammer, FileText, Calendar, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCLP, formatDate } from "@/lib/utils"

const KANBAN_COLUMNS = [
  { id: "cotizado", label: "Cotizado", color: "bg-gray-100 border-gray-300", icon: <FileText className="h-4 w-4" /> },
  { id: "aprobado", label: "Aprobado", color: "bg-blue-50 border-blue-300", icon: <CheckCircle2 className="h-4 w-4 text-blue-600" /> },
  { id: "en_produccion", label: "En Producción", color: "bg-yellow-50 border-yellow-300", icon: <Hammer className="h-4 w-4 text-yellow-600" /> },
  { id: "terminado", label: "Terminado", color: "bg-green-50 border-green-300", icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
  { id: "entregado", label: "Entregado", color: "bg-purple-50 border-purple-300", icon: <Truck className="h-4 w-4 text-purple-600" /> },
]

const MOCK_PROJECTS = [
  {
    id: "1", number: "PROJ-0001", name: "Mesa de río 200cm para restaurant",
    customer: "Restaurant El Marqués", status: "en_produccion",
    total_value: 980000, completion_percentage: 60,
    delivery_date: "2026-05-25", techniques: ["carpinteria", "resina", "soldadura"],
    tasks_total: 8, tasks_done: 5,
  },
  {
    id: "2", number: "PROJ-0002", name: "Lámparas vitral x4 (juego comedor)",
    customer: "María González", status: "terminado",
    total_value: 720000, completion_percentage: 100,
    delivery_date: "2026-05-28", techniques: ["vitral", "soldadura"],
    tasks_total: 6, tasks_done: 6,
  },
  {
    id: "3", number: "PROJ-0003", name: "Parrilla custom + fogonero",
    customer: "Carlos Vega", status: "aprobado",
    total_value: 480000, completion_percentage: 10,
    delivery_date: "2026-06-15", techniques: ["soldadura"],
    tasks_total: 5, tasks_done: 0,
  },
  {
    id: "4", number: "PROJ-0004", name: "Pérgola antisísmica 6x4m",
    customer: "Constructora Norte", status: "en_produccion",
    total_value: 2100000, completion_percentage: 35,
    delivery_date: "2026-06-10", techniques: ["soldadura", "construccion", "carpinteria"],
    tasks_total: 12, tasks_done: 4,
  },
  {
    id: "5", number: "PROJ-0005", name: "Decoración completa cafetería",
    customer: "Café Bohemio", status: "cotizado",
    total_value: 3500000, completion_percentage: 0,
    delivery_date: "2026-07-01", techniques: ["vitral", "carpinteria", "ceramica"],
    tasks_total: 15, tasks_done: 0,
  },
]

const TECHNIQUE_ICONS: Record<string, string> = {
  carpinteria: "🪵", soldadura: "🔥", resina: "✨", vitral: "🎨", ceramica: "🏺", construccion: "🏗️",
}

function ProjectCard({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const daysLeft = Math.ceil(
    (new Date(project.delivery_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  const isUrgent = daysLeft <= 5

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {isUrgent && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium mb-2">
          <AlertTriangle className="h-3 w-3" />
          ¡Entrega en {daysLeft} días!
        </div>
      )}
      <div className="font-mono text-xs text-[var(--muted-foreground)] mb-1">{project.number}</div>
      <h4 className="font-semibold text-sm text-[var(--foreground)] mb-2 leading-tight">{project.name}</h4>

      <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-3">
        <div className="w-5 h-5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center text-xs font-bold">
          {project.customer[0]}
        </div>
        {project.customer}
      </div>

      {/* Técnicas */}
      <div className="flex gap-1 mb-3">
        {project.techniques.map((t) => (
          <span key={t} title={t} className="text-base">{TECHNIQUE_ICONS[t]}</span>
        ))}
      </div>

      {/* Progreso */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[var(--muted-foreground)]">
            {project.tasks_done}/{project.tasks_total} tareas
          </span>
          <span className="font-semibold text-[var(--foreground)]">{project.completion_percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary)] rounded-full transition-all"
            style={{ width: `${project.completion_percentage}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
          <Calendar className="h-3 w-3" />
          {formatDate(project.delivery_date)}
        </div>
        <div className="font-bold text-[var(--primary)]">{formatCLP(project.total_value)}</div>
      </div>
    </div>
  )
}

export default function ProyectosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Proyectos</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Kanban de órdenes de trabajo</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map((col) => {
          const count = MOCK_PROJECTS.filter((p) => p.status === col.id).length
          const value = MOCK_PROJECTS.filter((p) => p.status === col.id).reduce((s, p) => s + p.total_value, 0)
          return (
            <div key={col.id} className={`p-3 rounded-xl border ${col.color}`}>
              <div className="flex items-center gap-1.5 mb-1 text-xs font-medium opacity-70">
                {col.icon} {col.label}
              </div>
              <div className="text-2xl font-bold">{count}</div>
              {value > 0 && <div className="text-xs opacity-60 mt-0.5">{formatCLP(value)}</div>}
            </div>
          )
        })}
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => {
          const colProjects = MOCK_PROJECTS.filter((p) => p.status === col.id)
          return (
            <div key={col.id} className="flex-shrink-0 w-72">
              <div className={`px-3 py-2 rounded-t-xl border border-b-0 ${col.color} flex items-center justify-between`}>
                <div className="flex items-center gap-2 font-semibold text-sm">
                  {col.icon} {col.label}
                </div>
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[var(--foreground)]">
                  {colProjects.length}
                </span>
              </div>
              <div className="bg-[var(--muted)] rounded-b-xl border border-[var(--border)] border-t-0 p-2 space-y-2 min-h-[200px]">
                {colProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {colProjects.length === 0 && (
                  <div className="text-center py-8 text-[var(--muted-foreground)] text-sm">
                    Sin proyectos
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
