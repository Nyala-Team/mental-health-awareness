import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeelingsSection } from "@/components/feelings-section"
import { PracticeSection } from "@/components/practice-section"
import { ToolsSection } from "@/components/tools-section"
import { StoriesSection } from "@/components/stories-section"
import { MythsSection } from "@/components/myths-section"
import { ResourcesSection } from "@/components/resources-section"
import { HelplinesSection } from "@/components/helplines-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <StatsSection />
        <FeelingsSection />
        <PracticeSection />
        <ToolsSection />
        <StoriesSection />
        <MythsSection />
        <ResourcesSection />
        <HelplinesSection />
      </main>
      <SiteFooter />
    </div>
  )
}
