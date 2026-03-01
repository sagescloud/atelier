"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export function ConclusionSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      id="conclusion"
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Decorative cross-lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-0 w-full h-px origin-center"
        style={{ backgroundColor: "var(--stone)", opacity: 0.06 }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-1/2 w-px h-full origin-center"
        style={{ backgroundColor: "var(--stone)", opacity: 0.06 }}
      />

      <motion.div
        style={{ scale, opacity }}
        className="text-center max-w-3xl"
      >
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 80 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-xl md:text-xl lg:text-4xl font-light leading-tight"
            style={{ color: "var(--charcoal)" }}
          >
            The story of the creation of this design concludes here.
          </motion.h2>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h2
            initial={{ y: 80 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-xl md:text-xl lg:text-4xl font-light leading-tight"
            style={{ color: "var(--charcoal)" }}
          >
            <span className="italic">Thank You for being a part of it.</span>
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 origin-top"
      >
        <div
          className="w-px h-16 mx-auto"
          style={{ background: `linear-gradient(to bottom, var(--stone), transparent)` }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 font-sans text-[10px] tracking-[0.5em] uppercase"
        style={{ color: "var(--taupe)" }}
      >
        Fin
      </motion.p>
    </section>
  )
}
