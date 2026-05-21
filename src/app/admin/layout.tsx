import AdminSidebar from "@/components/admin/AdminSidebar"

export const metadata = {
  title: {
    default: "Panel CEO | Taller Ancestral",
    template: "%s | Panel CEO",
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--muted)] flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  )
}
