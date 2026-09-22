"use client"

import { useEffect, useRef, useState } from "react"

type AnimatedCounterProps = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDisplayed(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayed(parseFloat((eased * value).toFixed(decimals)))
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(step)
            } else {
              setDisplayed(value)
            }
          }
          rafRef.current = requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration, decimals])

  const formatted = decimals > 0 ? displayed.toFixed(decimals) : Math.round(displayed).toString()

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
