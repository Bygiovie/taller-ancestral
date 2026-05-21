-- ============================================================
-- TALLER ANCESTRAL - Schema completo Supabase
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLA: profiles (usuarios del panel)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: settings (configuración general)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT 'Taller Ancestral',
  legal_name TEXT,
  rut TEXT,
  address TEXT,
  city TEXT DEFAULT 'Ovalle',
  region TEXT DEFAULT 'Región de Coquimbo',
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  signature_url TEXT,
  instagram TEXT,
  facebook TEXT,
  whatsapp TEXT,
  quote_terms TEXT DEFAULT 'Esta cotización tiene validez de 15 días hábiles desde su emisión. Los precios incluyen IVA. El 50% de anticipo es requerido para iniciar la producción.',
  invoice_terms TEXT DEFAULT 'Pago al contado. Transferencia bancaria: Banco Estado, Cuenta Corriente N° XXXX.',
  quote_validity_days INTEGER DEFAULT 15,
  advance_percent INTEGER DEFAULT 50,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar configuración inicial
INSERT INTO settings (id) VALUES (uuid_generate_v4()) ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLA: categories (categorías de productos)
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categorías iniciales
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Mobiliario Premium', 'mobiliario-premium', 'Mesas, escritorios y muebles que combinan madera nativa, resina epóxica y estructuras metálicas.', 1),
  ('Iluminación Artística', 'iluminacion-artistica', 'Lámparas de vitral con estructuras de metal forjado y bases de cerámica artesanal.', 2),
  ('Elementos Arquitectónicos', 'elementos-arquitectonicos', 'Puertas con vitrales, mamparas decorativas y estructuras antisísmicas.', 3),
  ('Decoración', 'decoracion', 'Objetos de rotación rápida: tablas, bandejas, cuadros, maceteros y espejos.', 4),
  ('Outdoor & Parrillas', 'outdoor-parrillas', 'Parrillas custom, fogoneros artísticos y muebles de exterior.', 5),
  ('Edición Valle del Elqui', 'edicion-valle-elqui', 'Piezas exclusivas con madera local y cerámica con pigmentos naturales.', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- TABLA: products (catálogo de productos)
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  short_description TEXT,
  long_description TEXT,
  techniques TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  base_price INTEGER NOT NULL DEFAULT 0,
  material_cost INTEGER DEFAULT 0,
  production_days INTEGER DEFAULT 7,
  profit_margin NUMERIC(5,2) DEFAULT 0,
  stock INTEGER,
  dimensions TEXT,
  materials TEXT,
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: customers (clientes / CRM)
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  rut TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  type TEXT DEFAULT 'particular' CHECK (type IN ('particular', 'arquitecto', 'disenador', 'empresa', 'hotel_restaurante')),
  segment TEXT DEFAULT 'nuevo' CHECK (segment IN ('vip', 'recurrente', 'nuevo', 'inactivo')),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: quotations (cotizaciones)
-- ============================================================
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  subtotal INTEGER NOT NULL DEFAULT 0,
  discount_percent NUMERIC(5,2) DEFAULT 0,
  discount_amount INTEGER DEFAULT 0,
  iva INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  production_days INTEGER DEFAULT 14,
  advance_percent INTEGER DEFAULT 50,
  advance_amount INTEGER DEFAULT 0,
  balance_amount INTEGER DEFAULT 0,
  payment_conditions TEXT,
  validity_days INTEGER DEFAULT 15,
  valid_until DATE,
  status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_revision', 'enviada', 'aprobada', 'rechazada')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: quotation_items (ítems de cotizaciones)
-- ============================================================
CREATE TABLE IF NOT EXISTS quotation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL DEFAULT 0,
  subtotal INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

-- ============================================================
-- TABLA: invoices (facturas y boletas)
-- ============================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL UNIQUE,
  type TEXT DEFAULT 'boleta' CHECK (type IN ('factura', 'boleta', 'nota_credito', 'nota_debito')),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  subtotal INTEGER NOT NULL DEFAULT 0,
  discount_percent NUMERIC(5,2) DEFAULT 0,
  discount_amount INTEGER DEFAULT 0,
  iva INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'transferencia' CHECK (payment_method IN ('efectivo', 'transferencia', 'debito', 'credito', 'mercado_pago')),
  payment_status TEXT DEFAULT 'pendiente' CHECK (payment_status IN ('pendiente', 'parcial', 'pagado')),
  paid_amount INTEGER DEFAULT 0,
  balance INTEGER DEFAULT 0,
  due_date DATE,
  quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
  project_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: invoice_items (ítems de facturas)
-- ============================================================
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL DEFAULT 0,
  subtotal INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

-- ============================================================
-- TABLA: payments (registro de pagos)
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  payment_method TEXT DEFAULT 'transferencia',
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: projects (órdenes de trabajo / proyectos)
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
  type TEXT,
  status TEXT DEFAULT 'cotizado' CHECK (status IN ('cotizado', 'aprobado', 'en_produccion', 'terminado', 'entregado')),
  start_date DATE,
  delivery_date DATE,
  completion_percentage INTEGER DEFAULT 0,
  techniques TEXT[] DEFAULT '{}',
  materials_assigned TEXT[] DEFAULT '{}',
  hours_worked NUMERIC(8,2) DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  notes TEXT,
  total_value INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: project_tasks (tareas de proyectos)
-- ============================================================
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: inventory (inventario de materiales)
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'unidad',
  current_stock NUMERIC(10,3) DEFAULT 0,
  min_stock NUMERIC(10,3) DEFAULT 0,
  supplier TEXT,
  unit_cost INTEGER DEFAULT 0,
  last_purchase_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: inventory_movements (movimientos de inventario)
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inventory_id UUID NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('entrada', 'salida')),
  quantity NUMERIC(10,3) NOT NULL,
  reason TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  unit_cost INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: expenses (gastos operacionales)
-- ============================================================
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  supplier TEXT,
  amount INTEGER NOT NULL,
  description TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: contact_forms (formularios de contacto web)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_interest TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'contactado', 'cerrado')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: newsletter_subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SECUENCIAS para números de documentos
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS quotation_seq START 1;
CREATE SEQUENCE IF NOT EXISTS invoice_seq START 1;
CREATE SEQUENCE IF NOT EXISTS project_seq START 1;

-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

-- Trigger: actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_quotations_updated BEFORE UPDATE ON quotations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_inventory_updated BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Función: auto-número cotización
CREATE OR REPLACE FUNCTION generate_quotation_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.number IS NULL OR NEW.number = '' THEN
    NEW.number = 'COT-' || LPAD(nextval('quotation_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_quotation_number BEFORE INSERT ON quotations FOR EACH ROW EXECUTE FUNCTION generate_quotation_number();

-- Función: auto-número factura
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.number IS NULL OR NEW.number = '' THEN
    IF NEW.type = 'factura' THEN
      NEW.number = 'FAC-' || LPAD(nextval('invoice_seq')::TEXT, 6, '0');
    ELSE
      NEW.number = 'BOL-' || LPAD(nextval('invoice_seq')::TEXT, 6, '0');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invoice_number BEFORE INSERT ON invoices FOR EACH ROW EXECUTE FUNCTION generate_invoice_number();

-- Función: auto-número proyecto
CREATE OR REPLACE FUNCTION generate_project_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.number IS NULL OR NEW.number = '' THEN
    NEW.number = 'PROJ-' || LPAD(nextval('project_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_project_number BEFORE INSERT ON projects FOR EACH ROW EXECUTE FUNCTION generate_project_number();

-- Función: actualizar balance al registrar pago
CREATE OR REPLACE FUNCTION update_invoice_balance()
RETURNS TRIGGER AS $$
DECLARE
  total_paid INTEGER;
  invoice_total INTEGER;
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO total_paid
  FROM payments WHERE invoice_id = NEW.invoice_id;

  SELECT total INTO invoice_total FROM invoices WHERE id = NEW.invoice_id;

  UPDATE invoices SET
    paid_amount = total_paid,
    balance = invoice_total - total_paid,
    payment_status = CASE
      WHEN total_paid >= invoice_total THEN 'pagado'
      WHEN total_paid > 0 THEN 'parcial'
      ELSE 'pendiente'
    END
  WHERE id = NEW.invoice_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payment_balance AFTER INSERT OR UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_invoice_balance();

-- Función: actualizar stock en movimientos
CREATE OR REPLACE FUNCTION update_inventory_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'entrada' THEN
    UPDATE inventory SET current_stock = current_stock + NEW.quantity WHERE id = NEW.inventory_id;
  ELSE
    UPDATE inventory SET current_stock = current_stock - NEW.quantity WHERE id = NEW.inventory_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_movement AFTER INSERT ON inventory_movements FOR EACH ROW EXECUTE FUNCTION update_inventory_stock();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas: solo usuarios autenticados pueden acceder al panel
CREATE POLICY "authenticated_read_all" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_all_settings" ON settings FOR ALL TO authenticated USING (true);
CREATE POLICY "public_read_categories" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "authenticated_all_categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "public_read_products" ON products FOR SELECT TO anon USING (is_visible = true);
CREATE POLICY "authenticated_all_products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_customers" ON customers FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_quotations" ON quotations FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_quotation_items" ON quotation_items FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_invoices" ON invoices FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_invoice_items" ON invoice_items FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_payments" ON payments FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_project_tasks" ON project_tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_inventory" ON inventory FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_movements" ON inventory_movements FOR ALL TO authenticated USING (true);
CREATE POLICY "authenticated_all_expenses" ON expenses FOR ALL TO authenticated USING (true);
CREATE POLICY "public_insert_contact" ON contact_forms FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "authenticated_all_contact" ON contact_forms FOR ALL TO authenticated USING (true);
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "authenticated_all_newsletter" ON newsletter_subscribers FOR ALL TO authenticated USING (true);

-- ============================================================
-- FUNCIÓN: estadísticas para dashboard
-- ============================================================
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'monthly_revenue', (
      SELECT COALESCE(SUM(total), 0) FROM invoices
      WHERE payment_status = 'pagado'
      AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())
    ),
    'prev_month_revenue', (
      SELECT COALESCE(SUM(total), 0) FROM invoices
      WHERE payment_status = 'pagado'
      AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW() - INTERVAL '1 month')
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW() - INTERVAL '1 month')
    ),
    'pending_quotations', (SELECT COUNT(*) FROM quotations WHERE status IN ('pendiente', 'enviada')),
    'active_projects', (SELECT COUNT(*) FROM projects WHERE status IN ('aprobado', 'en_produccion')),
    'low_stock_items', (SELECT COUNT(*) FROM inventory WHERE current_stock <= min_stock),
    'yearly_revenue', (
      SELECT COALESCE(SUM(total), 0) FROM invoices
      WHERE payment_status = 'pagado'
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())
    ),
    'new_customers', (
      SELECT COUNT(*) FROM customers
      WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())
    )
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ÍNDICES para mejor performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_visible);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_quotations_customer ON quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(payment_status);
CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON contact_forms(status);

-- ============================================================
-- DATOS DE EJEMPLO
-- ============================================================

-- Materiales iniciales de inventario
INSERT INTO inventory (name, code, category, unit, current_stock, min_stock, unit_cost, supplier) VALUES
  ('Madera Pino Seco 2"x4"x3m', 'MAD-001', 'Maderas', 'unidad', 50, 10, 4500, 'Maderería Ovalle'),
  ('Resina Epóxica Cristal 1kg', 'RES-001', 'Resina Epóxica', 'kg', 15, 5, 18000, 'Químicos Coquimbo'),
  ('Pigmento Azul Marino 100g', 'RES-002', 'Resina Epóxica', 'unidad', 8, 3, 6500, 'Químicos Coquimbo'),
  ('Fierro Cuadrado 20x20mm 6m', 'MET-001', 'Metales', 'barra', 20, 5, 12000, 'Metalúrgica Norte'),
  ('Vidrio Tiffany Azul 20x20cm', 'VID-001', 'Vidrios', 'pieza', 200, 50, 850, 'Vitralería Santiago'),
  ('Lija Grano 120', 'CON-001', 'Consumibles', 'unidad', 100, 20, 350, 'Ferreterías Norte'),
  ('Electrodo 3/32" 1kg', 'CON-002', 'Consumibles', 'kg', 5, 2, 8500, 'Metalúrgica Norte'),
  ('Pintura Anticorrosiva Negra 1L', 'PIN-001', 'Pinturas y Acabados', 'litro', 8, 3, 12500, 'Pinturas Ovalle')
ON CONFLICT (code) DO NOTHING;
