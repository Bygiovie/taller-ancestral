"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const MOCK_EVENTS = [
  { date: "2026-05-25", title: "Entrega mesa río", type: "entrega", customer: "Restaurant El Marqués" },
  { date: "2026-05-28", title: "Entrega lámparas vitral", type: "entrega", customer: "María González" },
  { date: "2026-06-01", title: "Reunión presupuesto", type: "reunion", customer: "Constructora Norte" },
  { date: "2026-06-05", title: "Feria artesanal Ovalle", type: "feria", customer: "" },
  { date: "2026-06-10", title: "Entrega pérgola", type: "entrega", customer: "Constructora Norte" },
  { date: "2026-06-15", title: "Revisión proyecto cafetería", type: "reunion", customer: "Café Bohemio" },
]

const EVENT_COLORS: Record<string, string> = {
  entrega: "bg-green-100 text-green-800 border-green-200",
  reunion: "bg-blue-100 text-blue-800 border-blue-200",
  feria: "bg-purple-100 text-purple-800 border-purple-200",
  produccion: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

export default function CalendarioPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  function getEventsForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return MOCK_EVENTS.filter((e) => e.date === dateStr)
  }

  const upcomingEvents = MOCK_EVENTS
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Calendario</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Entregas, reuniones y eventos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo evento
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{MONTHS[month]} {year}</CardTitle>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()) }}
                    className="px-3 py-1 text-sm bg-[var(--muted)] rounded-lg hover:bg-[var(--secondary)]"
                  >
                    Hoy
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Header días */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS_OF_WEEK.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-[var(--muted-foreground)] py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Días */}
              <div className="grid grid-cols-7 gap-px bg-[var(--border)]">
                {calendarDays.map((day, i) => {
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                  const events = day ? getEventsForDay(day) : []
                  return (
                    <div
                      key={i}
                      className={`min-h-[80px] bg-[var(--background)] p-1.5 ${!day ? "opacity-0" : ""}`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                            isToday ? "bg-[var(--primary)] text-white" : "text-[var(--foreground)]"
                          }`}>
                            {day}
                          </div>
                          <div className="space-y-0.5">
                            {events.slice(0, 2).map((ev, j) => (
                              <div key={j} className={`text-xs px-1 py-0.5 rounded truncate border ${EVENT_COLORS[ev.type]}`}>
                                {ev.title}
                              </div>
                            ))}
                            {events.length > 2 && (
                              <div className="text-xs text-[var(--muted-foreground)] pl-1">+{events.length - 2} más</div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximos eventos */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, i) => {
                const date = new Date(event.date)
                const daysLeft = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                return (
                  <div key={i} className={`p-3 rounded-xl border ${EVENT_COLORS[event.type]}`}>
                    <div className="font-semibold text-sm mb-1">{event.title}</div>
                    {event.customer && (
                      <div className="text-xs opacity-80 mb-1">{event.customer}</div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {date.toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
                      </div>
                      <div className="font-medium">
                        {daysLeft === 0 ? "HOY" : daysLeft === 1 ? "Mañana" : `En ${daysLeft} días`}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Leyenda */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Tipos de eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(EVENT_COLORS).map(([type, color]) => (
                <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${color}`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span className="capitalize">{type === "entrega" ? "Entrega" : type === "reunion" ? "Reunión" : type === "feria" ? "Feria/Evento" : "Producción"}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
