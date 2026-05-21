"use client"

import { MessageCircle } from "lucide-react"
import { BUSINESS } from "@/lib/constants"

export default function WhatsAppButton() {
  const phoneNumber = BUSINESS.whatsapp.replace(/\D/g, "")
  const message = "Hola! Me gustaría solicitar información sobre sus productos artesanales."

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-200 group"
      aria-label="Chat por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-16 bg-[#1c1410] text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chatea con nosotros
      </span>
    </a>
  )
}
