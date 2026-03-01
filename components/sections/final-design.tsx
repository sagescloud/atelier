"use client"

import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import Image from "next/image"

export function FinalDesignSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [expanded, setExpanded] = useState<"front" | "back" | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const leftX = useTransform(scrollYProgress, [0.1, 0.4], [-40, 0])
  const rightX = useTransform(scrollYProgress, [0.1, 0.4], [40, 0])
  const dividerScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <section
      id="final-design"
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "var(--gallery-wall)" }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 md:mb-20 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] uppercase mb-4"
          style={{ color: "var(--taupe)" }}
        >
          Chapter VI
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-5xl font-light"
            style={{ color: "var(--charcoal)" }}
          >
            Final Design
          </motion.h2>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px w-16 mx-auto"
          style={{ backgroundColor: "var(--stone)" }}
        />
      </motion.div>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl">
        {/* Front */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer flex-1 max-w-md"
          onClick={() => setExpanded(expanded === "front" ? null : "front")}
        >
          <motion.div style={{ x: leftX }}>
            <div
              className="relative aspect-[3/4] overflow-hidden transition-shadow duration-700 group-hover:shadow-2xl"
              style={{
                boxShadow: "0 12px 60px rgba(42, 40, 37, 0.1)",
                border: "1px solid var(--warm-grey)",
              }}
            >
              <Image
                src="/images/design-front.jpg"
                alt="Final design front view"
                fill
                className="object-cover transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.2s]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)",
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-sans text-[10px] tracking-[0.4em] uppercase text-center"
              style={{ color: "var(--taupe)" }}
            >
              Front
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{ scaleY: dividerScale }}
          className="hidden md:block w-px h-64 origin-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <div className="w-full h-full" style={{ backgroundColor: "var(--stone)" }} />
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer flex-1 max-w-md"
          onClick={() => setExpanded(expanded === "back" ? null : "back")}
        >
          <motion.div style={{ x: rightX }}>
            <div
              className="relative aspect-[3/4] overflow-hidden transition-shadow duration-700 group-hover:shadow-2xl"
              style={{
                boxShadow: "0 12px 60px rgba(42, 40, 37, 0.1)",
                border: "1px solid var(--warm-grey)",
              }}
            >
              <Image
                src="/images/design-back.jpg"
                alt="Final design back view"
                fill
                className="object-cover transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.2s]"
                style={{
                  background: "linear-gradient(225deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)",
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-sans text-[10px] tracking-[0.4em] uppercase text-center"
              style={{ color: "var(--taupe)" }}
            >
              Back
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 cursor-zoom-out"
            style={{ backgroundColor: "rgba(42, 40, 37, 0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full aspect-[3/4]"
            >
              <Image
                src={expanded === "front" ? "/images/design-front.jpg" : "/images/design-back.jpg"}
                alt={`Final design ${expanded} view expanded`}
                fill
                className="object-cover"
                sizes="80vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
