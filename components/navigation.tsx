"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "I", href: "#landing" },
  { label: "II", href: "#moodboard" },
  { label: "III", href: "#concept" },
  { label: "IV", href: "#storyboard" },
  { label: "V", href: "#journey" },
  { label: "VI", href: "#final-design" },
  { label: "VII", href: "#avatar" },
  { label: "VIII", href: "#conclusion" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("landing")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)

    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
          aria-label="Section navigation"
        >
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "")
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                aria-label={`Navigate to section ${item.label}`}
                className="group flex items-center gap-3"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span
                  className="text-[10px] font-sans tracking-[0.2em] transition-all duration-700"
                  style={{
                    color: isActive ? "var(--gold)" : "var(--text-muted)",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="block rounded-full transition-all duration-700"
                  style={{
                    width: isActive ? "8px" : "5px",
                    height: isActive ? "8px" : "5px",
                    backgroundColor: isActive ? "var(--gold)" : "var(--text-muted)",
                    opacity: isActive ? 1 : 0.35,
                    boxShadow: isActive ? "0 0 8px var(--gold-dim)" : "none",
                  }}
                />
              </a>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
