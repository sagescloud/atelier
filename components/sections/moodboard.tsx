"use client"

import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion"
import Image from "next/image"

const moodImages = [
  { src: "/images/mood-1.jpg", alt: "Tailored beige suit with striped shirt, old money aesthetic", caption: "Silhouette", height: "h-[380px] md:h-[480px]" },
  { src: "/images/mood-2.jpg", alt: "Michelangelo's David sculpture, dramatic low angle", caption: "Abstracted Concept", height: "h-[300px] md:h-[360px]" },
  { src: "/images/mood-3.jpg", alt: "Triangular staircase spiral in black and white", caption: "Structure", height: "h-[340px] md:h-[420px]" },
  { src: "/images/mood-4.jpg", alt: "Wood cross-sections showing natural ring patterns", caption: "Pattern", height: "h-[280px] md:h-[340px]" },
  { src: "/images/mood-5.jpg", alt: "Milky Way galaxy against deep night sky", caption: "Indirect Inspiration", height: "h-[360px] md:h-[440px]" },
]

function MoodCard({
  image,
  index,
  isInView,
}: {
  image: (typeof moodImages)[number]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Staggered entry directions for variety
  const entryVariants = [
    { x: -60, y: 40, rotate: -3 },
    { x: 40, y: 60, rotate: 2 },
    { x: -40, y: 50, rotate: -1.5 },
    { x: 50, y: 30, rotate: 3 },
    { x: -30, y: 70, rotate: -2 },
  ]

  const entry = entryVariants[index % entryVariants.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: entry.x, y: entry.y, rotate: entry.rotate, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 1.2,
        delay: 0.12 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mb-6 md:mb-8 break-inside-avoid"
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative"
      >
        <div
          className={`relative ${image.height} overflow-hidden`}
          style={{
            boxShadow: isHovered
              ? "0 20px 60px rgba(42, 40, 37, 0.15), 0 8px 20px rgba(42, 40, 37, 0.1)"
              : "0 4px 30px rgba(42, 40, 37, 0.06)",
            border: "1px solid var(--warm-grey)",
            transition: "box-shadow 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover gradient overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                "linear-gradient(to top, rgba(42, 40, 37, 0.5) 0%, rgba(42, 40, 37, 0.1) 40%, transparent 70%)",
            }}
          />
          {/* Caption with slide-up animation */}
          <motion.div
            className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-serif text-sm italic tracking-wide"
              style={{ color: "var(--cream)" }}
            >
              {image.caption}
            </p>
            <span
              className="font-sans text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "var(--stone)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MoodboardSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.3])

  return (
    <section
      id="moodboard"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--gallery-wall)" }}
    >
      {/* Decorative line element */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-12 top-24 w-px h-32 origin-top"
        style={{ backgroundColor: "var(--stone)", opacity: 0.3 }}
      />

      {/* Section header with parallax */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="mb-16 md:mb-24 relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--taupe)" }}
        >
          Chapter II
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl font-light"
          style={{ color: "var(--charcoal)" }}
        >
          Moodboard
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 h-px w-24 origin-left"
          style={{ backgroundColor: "var(--stone)" }}
        />
      </motion.div>

      {/* Masonry layout with dynamic cards */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {moodImages.map((image, index) => (
          <MoodCard key={image.src} image={image} index={index} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}
