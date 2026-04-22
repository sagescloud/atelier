"use client"

import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import Image from "next/image"

export function StoryboardSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [isZoomed, setIsZoomed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), {
    stiffness: 80,
    damping: 30,
  })
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1])

  return (
    <section
      id="storyboard"
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen py-24 md:py-32 px-6 md:px-12 overflow-hidden paper-texture"
      style={{ backgroundColor: "var(--gallery-wall)" }}
    >
      {/* Decorative corner marks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-16 left-8 w-16 h-16"
      >
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "var(--stone)" }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: "var(--stone)" }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-16 right-8 w-16 h-16"
      >
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "var(--stone)" }} />
        <div className="absolute bottom-0 right-0 h-full w-px" style={{ backgroundColor: "var(--stone)" }} />
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 md:mb-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] uppercase mb-4"
          style={{ color: "var(--taupe)" }}
        >
          Chapter III
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl font-light"
          style={{ color: "var(--charcoal)" }}
        >
          Story Board
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px w-16 mx-auto"
          style={{ backgroundColor: "var(--stone)" }}
        />
      </motion.div>

      {/* Framed storyboard image with parallax */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl w-full cursor-pointer group"
        onClick={() => setIsZoomed(true)}
      >
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative"
        >
          <div
            className="relative p-3 md:p-4"
            style={{
              background: "var(--cream)",
              boxShadow:
                "0 12px 80px rgba(42, 40, 37, 0.12), 0 4px 20px rgba(42, 40, 37, 0.06), inset 0 0 0 1px var(--warm-grey)",
            }}
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src="/images/storyboard.png"
                alt="Fashion design storyboard with structured blazers, Pantone swatches, and golden ratio nautilus spiral"
                fill
                className="object-cover object-center transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
              {/* Sheen overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 font-sans text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "var(--taupe)" }}
      >
        Click to expand
      </motion.p>

      {/* Full-screen zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            style={{ backgroundColor: "rgba(42, 40, 37, 0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl w-full aspect-[16/9]"
            >
              <Image
                src="/images/storyboard.png"
                alt="Fashion design storyboard expanded view"
                fill
                className="object-contain"
                sizes="95vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
