"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { profile } from "@/lib/data";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${profile.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pink text-white shadow-pink-glow"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-pink opacity-30" />

      {/* WhatsApp icon */}
      <MessageCircle className="relative h-6 w-6" />

      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-lg group-hover:block">
        Discutons sur WhatsApp
      </span>
    </motion.a>
  );
}
