"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"


export function AvatarSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="avatar"
      ref={ref}
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="pt-16 md:pt-24 px-6 md:px-12 z-10"
      >
        <p
          className="font-sans text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--stone)" }}
        >
          Chapter VII
        </p>
        <h2
          className="font-serif text-3xl md:text-5xl font-light"
          style={{ color: "var(--cream)" }}
        >
          3D Showcase
        </h2>
      </motion.div>

      {/* 3D Viewer */}
     <motion.div
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
  className="flex-1 min-h-[500px] md:min-h-[600px] flex items-center justify-center px-6 md:px-12"
>
  <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto"
    >
      <source src="/videos/model.mp4" type="video/mp4" />
    </video>
  </div>
</motion.div>

      {/* Minimal UI hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="pb-8 text-center font-sans text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "var(--stone)" }}
      >
        A Study in Motion
      </motion.p>
    </section>
  )
}
