import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateLong(date: string | Date): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function calculateIVA(subtotal: number, rate = 0.19): number {
  return Math.round(subtotal * rate)
}

export function calculateTotal(subtotal: number, discount = 0, ivaRate = 0.19): {
  subtotal: number
  discountAmount: number
  subtotalWithDiscount: number
  iva: number
  total: number
} {
  const discountAmount = Math.round(subtotal * (discount / 100))
  const subtotalWithDiscount = subtotal - discountAmount
  const iva = calculateIVA(subtotalWithDiscount, ivaRate)
  const total = subtotalWithDiscount + iva
  return { subtotal, discountAmount, subtotalWithDiscount, iva, total }
}

export function generateDocumentNumber(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(6, "0")}`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-800",
    en_revision: "bg-blue-100 text-blue-800",
    enviada: "bg-purple-100 text-purple-800",
    aprobada: "bg-green-100 text-green-800",
    rechazada: "bg-red-100 text-red-800",
    pagado: "bg-green-100 text-green-800",
    parcial: "bg-yellow-100 text-yellow-800",
    vencida: "bg-red-100 text-red-800",
    en_produccion: "bg-blue-100 text-blue-800",
    terminado: "bg-green-100 text-green-800",
    entregado: "bg-gray-100 text-gray-800",
    cotizado: "bg-yellow-100 text-yellow-800",
    activo: "bg-green-100 text-green-800",
    inactivo: "bg-gray-100 text-gray-800",
  }
  return colors[status] ?? "bg-gray-100 text-gray-800"
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}
