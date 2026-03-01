"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import Image from "next/image"

const stages = [
  {
    title: "Design Inspiration",
    description: "Base Silhouette Inspiration",
    image: "/images/journey-1.png",
    alt: "Design inspiration collage with vintage references.",
  },
  {
    title: "Shape & Form",
    description: "Exploring silhouettes, proportions, and the language of structure.",
    image: "/images/journey-2.png",
    alt: "Shape exploration sketches on tracing paper",
  },
  {
    title: "Design Development",
    description: "Exploring different silhouette ideas.",
    image: "/images/journey-3.png",
    alt: "Technical drawing with measurements and construction notes",
  },
  {
    title: "Pre-Final Line Work",
    description: "The convergence of intent, craft, and vision into a singular form.",
    image: "/images/journey-4.png",
    alt: "Final refined fashion design rendering",
  },
]

export function DesignJourneySection() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 30 })
  const rotation = useTransform(smoothProgress, [0, 1], [0, 360])
  const circleOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0])
  const circleScale = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.85])

  // Progress line
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative"
      style={{ backgroundColor: "var(--cream)", height: "400vh" }}
    >
      {/* Progress bar at top */}
      <div className="sticky top-0 left-0 right-0 z-30 h-px">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full"
        >
          <div className="w-full h-full" style={{ backgroundColor: "var(--stone)" }} />
        </motion.div>
      </div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Section header */}
        <div ref={headerRef} className="absolute top-12 left-6 md:left-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ color: "var(--taupe)" }}
            >
              Chapter V
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl font-light"
              style={{ color: "var(--charcoal)" }}
            >
              Design Journey
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-px w-20 origin-left"
              style={{ backgroundColor: "var(--stone)" }}
            />
          </motion.div>
        </div>

        {/* Circular frame with spring-smoothed rotation */}
        <motion.div
          style={{ rotate: rotation, opacity: circleOpacity, scale: circleScale }}
          className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full">
            {/* Outer ring */}
            <circle
              cx="250"
              cy="250"
              r="240"
              fill="none"
              stroke="var(--stone)"
              strokeWidth="0.5"
            />
            {/* Inner decorative ring */}
            <circle
              cx="250"
              cy="250"
              r="220"
              fill="none"
              stroke="var(--warm-grey)"
              strokeWidth="0.3"
              strokeDasharray="4 8"
            />
            {/* Second inner ring */}
            <circle
              cx="250"
              cy="250"
              r="200"
              fill="none"
              stroke="var(--warm-grey)"
              strokeWidth="0.2"
              strokeDasharray="2 12"
            />
            {/* Quadrant lines */}
            {[0, 90, 180, 270].map((angle) => (
              <line
                key={angle}
                x1="250"
                y1="250"
                x2={250 + 240 * Math.cos((angle * Math.PI) / 180)}
                y2={250 + 240 * Math.sin((angle * Math.PI) / 180)}
                stroke="var(--stone)"
                strokeWidth="0.3"
              />
            ))}
            {/* Diagonal lines */}
            {[45, 135, 225, 315].map((angle) => (
              <line
                key={`diag-${angle}`}
                x1="250"
                y1="250"
                x2={250 + 240 * Math.cos((angle * Math.PI) / 180)}
                y2={250 + 240 * Math.sin((angle * Math.PI) / 180)}
                stroke="var(--warm-grey)"
                strokeWidth="0.15"
              />
            ))}
            {/* Stage markers */}
            {[45, 135, 225, 315].map((angle, i) => (
              <g key={angle}>
                <circle
                  cx={250 + 230 * Math.cos((angle * Math.PI) / 180)}
                  cy={250 + 230 * Math.sin((angle * Math.PI) / 180)}
                  r="5"
                  fill={`var(--${i === 0 ? "taupe" : i === 1 ? "stone" : i === 2 ? "blue-accent" : "charcoal"})`}
                />
                <circle
                  cx={250 + 230 * Math.cos((angle * Math.PI) / 180)}
                  cy={250 + 230 * Math.sin((angle * Math.PI) / 180)}
                  r="8"
                  fill="none"
                  stroke={`var(--${i === 0 ? "taupe" : i === 1 ? "stone" : i === 2 ? "blue-accent" : "charcoal"})`}
                  strokeWidth="0.3"
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Stage content */}
        {stages.map((stage, index) => {
          const stageStart = index / stages.length
          const stageEnd = (index + 1) / stages.length
          return (
            <StageContent
              key={stage.title}
              stage={stage}
              index={index}
              scrollYProgress={scrollYProgress}
              stageStart={stageStart}
              stageEnd={stageEnd}
            />
          )
        })}
      </div>
    </section>
  )
}

interface StageContentProps {
  stage: (typeof stages)[number]
  index: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  stageStart: number
  stageEnd: number
}

function StageContent({ stage, index, scrollYProgress, stageStart, stageEnd }: StageContentProps) {
  const fadeIn = stageStart + 0.03
  const fadeOut = stageEnd - 0.03
  const opacity = useTransform(
    scrollYProgress,
    [stageStart, fadeIn, fadeOut, stageEnd],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [stageStart, fadeIn, fadeOut, stageEnd],
    [50, 0, 0, -50]
  )
  const scale = useTransform(
    scrollYProgress,
    [stageStart, fadeIn, fadeOut, stageEnd],
    [0.95, 1, 1, 0.95]
  )
  const imageScale = useTransform(
    scrollYProgress,
    [stageStart, fadeIn + 0.05],
    [1.1, 1]
  )

  const bgColors = [
    "var(--cream)",
    "var(--gallery-wall)",
    "var(--warm-grey)",
    "var(--cream)",
  ]

  const bgOpacity = useTransform(
    scrollYProgress,
    [stageStart, fadeIn],
    [0, 0.3]
  )

  const isLeft = index % 2 === 0

  return (
    <>
      {/* Background tone shift */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: bgColors[index],
          opacity: bgOpacity,
        }}
      />

      <motion.div
        style={{ opacity, y, scale }}
        className={`absolute z-10 flex flex-col gap-6 px-6 ${
          isLeft
            ? "left-6 md:left-16 lg:left-24 items-start text-left"
            : "right-6 md:right-16 lg:right-24 items-end text-right"
        } top-1/2 -translate-y-1/2 max-w-sm`}
      >
        <p
          className="font-sans text-[10px] tracking-[0.4em] uppercase"
          style={{ color: "var(--taupe)" }}
        >
          Stage {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className="font-serif text-2xl md:text-3xl font-light"
          style={{ color: "var(--charcoal)" }}
        >
          {stage.title}
        </h3>
        <div
          className="h-px w-12"
          style={{ backgroundColor: "var(--stone)", opacity: 0.5 }}
        />
        <p
          className="font-sans text-sm leading-relaxed max-w-xs"
          style={{ color: "var(--taupe)" }}
        >
          {stage.description}
        </p>
        <div
          className="relative w-64 md:w-80 lg:w-96 h-48 md:h-60 lg:h-64 overflow-hidden mt-4"
          style={{
            boxShadow: "0 12px 50px rgba(42, 40, 37, 0.1)",
            border: "1px solid var(--warm-grey)",
          }}
        >
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
            <Image
              src={stage.image}
              alt={stage.alt}
              fill
              className="object-cover"
              sizes="300px"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
