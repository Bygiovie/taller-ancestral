export type UserRole = "admin" | "editor"

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  sort_order: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  category_id: string
  category?: Category
  short_description: string
  long_description: string
  techniques: string[]
  images: string[]
  base_price: number
  material_cost: number
  production_days: number
  profit_margin: number
  stock?: number
  is_visible: boolean
  is_featured: boolean
  dimensions?: string
  materials?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  full_name: string
  rut?: string
  email: string
  phone?: string
  address?: string
  city?: string
  type: "particular" | "arquitecto" | "disenador" | "empresa" | "hotel_restaurante"
  segment: "vip" | "recurrente" | "nuevo" | "inactivo"
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface QuotationItem {
  id?: string
  quotation_id?: string
  product_id?: string
  description: string
  quantity: number
  unit_price: number
  subtotal: number
}

export interface Quotation {
  id: string
  number: string
  customer_id: string
  customer?: Customer
  items: QuotationItem[]
  subtotal: number
  discount_percent: number
  discount_amount: number
  iva: number
  total: number
  production_days: number
  advance_percent: number
  advance_amount: number
  balance_amount: number
  payment_conditions?: string
  validity_days: number
  valid_until: string
  status: "pendiente" | "en_revision" | "enviada" | "aprobada" | "rechazada"
  notes?: string
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id?: string
  invoice_id?: string
  description: string
  quantity: number
  unit_price: number
  subtotal: number
}

export interface Invoice {
  id: string
  number: string
  type: "factura" | "boleta" | "nota_credito" | "nota_debito"
  customer_id: string
  customer?: Customer
  items: InvoiceItem[]
  subtotal: number
  discount_percent: number
  discount_amount: number
  iva: number
  total: number
  payment_method: "efectivo" | "transferencia" | "debito" | "credito" | "mercado_pago"
  payment_status: "pendiente" | "parcial" | "pagado"
  paid_amount: number
  balance: number
  due_date?: string
  quotation_id?: string
  project_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface ProjectTask {
  id: string
  project_id: string
  title: string
  completed: boolean
  sort_order: number
  created_at: string
}

export interface Project {
  id: string
  number: string
  name: string
  customer_id: string
  customer?: Customer
  quotation_id?: string
  type: string
  status: "cotizado" | "aprobado" | "en_produccion" | "terminado" | "entregado"
  start_date?: string
  delivery_date?: string
  completion_percentage: number
  techniques: string[]
  materials_assigned?: string[]
  hours_worked: number
  tasks: ProjectTask[]
  images: string[]
  notes?: string
  created_at: string
  updated_at: string
}

export interface InventoryItem {
  id: string
  name: string
  code: string
  category: string
  unit: string
  current_stock: number
  min_stock: number
  supplier?: string
  unit_cost: number
  last_purchase_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface InventoryMovement {
  id: string
  inventory_id: string
  inventory?: InventoryItem
  type: "entrada" | "salida"
  quantity: number
  reason: string
  project_id?: string
  unit_cost?: number
  created_at: string
}

export interface Expense {
  id: string
  date: string
  category: string
  supplier?: string
  amount: number
  description: string
  receipt_url?: string
  created_at: string
}

export interface ContactForm {
  id: string
  name: string
  email: string
  phone?: string
  product_interest?: string
  budget?: string
  message: string
  status: "nuevo" | "contactado" | "cerrado"
  created_at: string
}

export interface Settings {
  id: string
  business_name: string
  legal_name?: string
  rut?: string
  address?: string
  city?: string
  phone?: string
  email?: string
  website?: string
  logo_url?: string
  signature_url?: string
  instagram?: string
  facebook?: string
  whatsapp?: string
  quote_terms?: string
  invoice_terms?: string
  quote_validity_days: number
  advance_percent: number
  updated_at: string
}

export interface DashboardKPIs {
  monthly_revenue: number
  previous_month_revenue: number
  pending_quotations: number
  active_projects: number
  low_stock_items: number
  yearly_revenue: number
  new_customers_month: number
  top_products: Array<{ name: string; count: number; revenue: number }>
  upcoming_deliveries: Array<{ project_id: string; name: string; delivery_date: string; customer: string }>
  revenue_chart: Array<{ month: string; revenue: number; expenses: number }>
}
