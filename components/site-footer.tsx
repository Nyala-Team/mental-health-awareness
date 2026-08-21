import { HeartHandshake } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold">Okay Tak Okay</span>
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/85">
              An independent youth mental-health education prototype for Malaysia. Tak apa untuk
              tak okay &mdash; you deserve support, understanding, and care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-display font-bold">Explore</p>
              <ul className="mt-3 space-y-2 text-primary-foreground/85">
                <li><a href="#feelings" className="hover:text-primary-foreground">Feelings</a></li>
                <li><a href="#tools" className="hover:text-primary-foreground">Coping Tools</a></li>
                <li><a href="#stories" className="hover:text-primary-foreground">Illustrative Stories</a></li>
                <li><a href="#resources" className="hover:text-primary-foreground">Resources</a></li>
              </ul>
            </div>
            <div>
              <p className="font-display font-bold">Urgent</p>
              <ul className="mt-3 space-y-2 text-primary-foreground/85">
                <li><a href="tel:999" className="hover:text-primary-foreground">Emergency 999</a></li>
                <li><a href="tel:15999" className="hover:text-primary-foreground">Talian Kasih 15999</a></li>
                <li><a href="tel:0376272929" className="hover:text-primary-foreground">Befrienders KL</a></li>
                <li><a href="tel:15555" className="hover:text-primary-foreground">Talian HEAL 15555</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-xs text-primary-foreground/70">
          <p>
            This website is for education only and is not a counselling, crisis, diagnostic, or
            treatment service. If you are in immediate danger, call 999.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Okay Tak Okay. Made with care in Malaysia.</p>
        </div>
      </div>
    </footer>
  )
}
