"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
