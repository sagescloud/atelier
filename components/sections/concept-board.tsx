"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion"
import Image from "next/image"

const conceptImages = [
  { src: "/images/concept-1.jpg", alt: "Fashion design concept sketch", x: "left-[2%]", y: "top-[5%]", w: "w-[45%] md:w-[28%]", h: "h-[200px] md:h-[280px]", z: "z-10", rotate: -2, parallaxSpeed: 0.3 },
  { src: "/images/concept-2.jpg", alt: "Fabric swatch collection", x: "right-[5%]", y: "top-[2%]", w: "w-[40%] md:w-[24%]", h: "h-[180px] md:h-[240px]", z: "z-20", rotate: 1.5, parallaxSpeed: 0.5 },
  { src: "/images/concept-3.jpg", alt: "Fashion draping on mannequin", x: "left-[25%]", y: "top-[28%]", w: "w-[35%] md:w-[22%]", h: "h-[220px] md:h-[300px]", z: "z-30", rotate: -1, parallaxSpeed: 0.2 },
  { src: "/images/concept-4.jpg", alt: "Architectural column detail", x: "right-[20%]", y: "top-[24%]", w: "w-[38%] md:w-[20%]", h: "h-[190px] md:h-[260px]", z: "z-20", rotate: 2, parallaxSpeed: 0.4 },
  { src: "/images/concept-5.jpg", alt: "Color palette board", x: "left-[5%]", y: "top-[55%]", w: "w-[42%] md:w-[26%]", h: "h-[170px] md:h-[230px]", z: "z-10", rotate: 1, parallaxSpeed: 0.35 },
  { src: "/images/concept-6.jpg", alt: "Renaissance painting detail", x: "right-[2%]", y: "top-[50%]", w: "w-[36%] md:w-[22%]", h: "h-[210px] md:h-[280px]", z: "z-30", rotate: -1.5, parallaxSpeed: 0.25 },
  { src: "/images/concept-7.jpg", alt: "Design tools on drafting paper", x: "left-[40%]", y: "top-[60%]", w: "w-[38%] md:w-[24%]", h: "h-[180px] md:h-[240px]", z: "z-20", rotate: 0.5, parallaxSpeed: 0.45 },
]

function ConceptImage({
  img,
  index,
  isInView,
  scrollYProgress,
}: {
  img: (typeof conceptImages)[number]
  index: number
  isInView: boolean
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [img.parallaxSpeed * 80, -img.parallaxSpeed * 80]
  )

  // Scatter directions for dynamic entry
  const angle = (index / conceptImages.length) * Math.PI * 2
  const scatterX = Math.cos(angle) * 80
  const scatterY = Math.sin(angle) * 80 + 40

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        x: scatterX,
        y: scatterY,
        rotate: img.rotate * 3,
      }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: img.rotate }
          : {}
      }
      transition={{
        duration: 1.3,
        delay: 0.08 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`absolute ${img.x} ${img.y} ${img.w} ${img.h} ${img.z}`
      style={{
  left: img.left,
  top: img.top,
  transform: "translate(-50%, -50%)",
}}
    >
      <motion.div
        style={{ y }}
        className="relative w-full h-full group"
      >
        <div
          className="relative w-full h-full overflow-hidden transition-shadow duration-700"
          style={{
            boxShadow: "0 8px 40px rgba(42, 40, 37, 0.08)",
            border: "1px solid var(--warm-grey)",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-105"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
          <div
            className="relative inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ConceptBoardSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return (
    <section
      id="concept"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Drafting lines overlay */}
      <div className="drafting-lines absolute inset-0" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-40 mb-8"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--taupe)" }}
        >
          Chapter I
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl font-light"
          style={{ color: "var(--charcoal)" }}
        >
          Concept Board
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px w-20 origin-left"
          style={{ backgroundColor: "var(--stone)" }}
        />
      </motion.div>

      {/* Asymmetric collage with parallax */}
      <div className="relative max-w-6xl mx-auto" style={{ height: "clamp(600px, 120vh, 1200px)" }}>
        {conceptImages.map((img, index) => (
          <ConceptImage
            key={img.src}
            img={img}
            index={index}
            isInView={isInView}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

