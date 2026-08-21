import Image from "next/image"
import { Quote } from "lucide-react"

const stories = [
  {
    name: "Aisyah, 19",
    place: "Shah Alam",
    image: "/images/story-aisyah.png",
    quote:
      "I thought asking for help meant I was weak or not bersyukur. Talking to a counsellor showed me it's the bravest thing I ever did.",
  },
  {
    name: "Wei Jie, 22",
    place: "Penang",
    image: "/images/story-wei.png",
    quote:
      "Uni burnout hit me hard. A friend just listened without judging. That one conversation pulled me back from a really dark place.",
  },
  {
    name: "Priya, 17",
    place: "Ipoh",
    image: "/images/story-priya.png",
    quote:
      "SPM pressure made me feel like I was drowning. Learning to name my anxiety and breathe through it changed everything for me.",
  },
]

export function StoriesSection() {
  return (
    <section id="stories" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            You are not alone
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Illustrative stories about reaching out.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Everyone&apos;s path looks different. These fictional composites model possible ways of
            asking for and offering support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <figure
              key={story.name}
              className="flex flex-col rounded-3xl border border-border/70 bg-card p-6"
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                {story.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={`Portrait of ${story.name}`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-foreground">{story.name}</p>
                  <p className="text-sm text-muted-foreground">{story.place}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Stories are illustrative composites shared to reduce stigma. Names and portraits do not
          depict real individuals.
        </p>
      </div>
    </section>
  )
}
