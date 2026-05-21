import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Taller Ancestral - Manufactura Artesanal de Alto Diseño",
    template: "%s | Taller Ancestral",
  },
  description:
    "Fusionamos 6 técnicas ancestrales en piezas únicas para tu espacio. Carpintería, soldadura, resina epóxica, vitrales, cerámica y construcción. Ovalle, Coquimbo, Chile.",
  keywords: [
    "carpintería artesanal",
    "mesas de río",
    "resina epóxica",
    "vitrales",
    "muebles artesanales",
    "Ovalle",
    "Coquimbo",
    "Chile",
  ],
  openGraph: {
    title: "Taller Ancestral - Manufactura Artesanal de Alto Diseño",
    description: "Piezas únicas que combinan 6 técnicas artesanales",
    locale: "es_CL",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
