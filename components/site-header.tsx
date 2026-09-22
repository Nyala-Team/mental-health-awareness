"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, HeartHandshake, BookOpen, Sparkles, Brain } from "lucide-react"

const navLinks = [
  { label: "Feelings", href: "#feelings" },
  { label: "Practice", href: "/practice", isRoute: true },
  { label: "Quiz", href: "/quiz", isRoute: true },
  { label: "Myths", href: "#myths" },
  { label: "Coping Tools", href: "#tools" },
  { label: "Stories", href: "#stories" },
  { label: "Resources", href: "#resources" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-sm">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold leading-none text-foreground">
            Okay<span className="text-primary"> Tak </span>Okay
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label === "Practice" && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                {link.label === "Quiz" && <BookOpen className="h-3.5 w-3.5 text-primary" />}
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            <Brain className="h-3.5 w-3.5" />
            Quiz
          </Link>
          <a
            href="#helplines"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-500 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:shadow-primary/25"
          >
            Get Help Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                >
                  {link.label === "Practice" && <Sparkles className="h-4 w-4 text-primary" />}
                  {link.label === "Quiz" && <BookOpen className="h-4 w-4 text-primary" />}
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              ),
            )}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Knowledge Quiz
              </Link>
              <a
                href="#helplines"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-500 px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                Get Help Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
