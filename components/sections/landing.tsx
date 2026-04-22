"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function LandingSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], [72, 0])

  return (
    <section
      id="landing"
      ref={ref}
      className="relative flex items-center justify-center min-h-screen overflow-visible"
      style={{ backgroundColor: "var(--velvet)" }}
    >
      {/* Prussian blue aura */}
      <div className="prussian-aura absolute inset-0" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Thin gold decorative lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-12 top-1/4 w-px h-32 origin-top hidden md:block"
        style={{ backgroundColor: "var(--gold)", opacity: 0.15 }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-12 bottom-1/4 w-px h-24 origin-bottom hidden md:block"
        style={{ backgroundColor: "var(--gold)", opacity: 0.1 }}
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs font-light uppercase"
          style={{ color: "var(--gold)" }}
        >
        </motion.p>

        <div className="overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            The Birth of
          </motion.h1>
        </div>
        <div className="overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight italic"
            style={{ color: "var(--text-primary)" }}
          >
            a Design
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <motion.div
            style={{ height: lineHeight }}
            className="w-px mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
          >
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(to bottom, var(--gold-dim), transparent)` }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[11px] font-light tracking-[0.4em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to begin
        </motion.p>
      </motion.div>

      {/* Breathing pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
        style={{ backgroundColor: "var(--gold)" }}
      />
    </section>
  )
}
