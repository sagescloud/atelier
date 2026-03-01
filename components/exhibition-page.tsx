"use client"

import { Navigation } from "@/components/navigation"
import { LandingSection } from "@/components/sections/landing"
import { MoodboardSection } from "@/components/sections/moodboard"
import { ConceptBoardSection } from "@/components/sections/concept-board"
import { StoryboardSection } from "@/components/sections/storyboard"
import { DesignJourneySection } from "@/components/sections/design-journey"
import { FinalDesignSection } from "@/components/sections/final-design"
import { AvatarSection } from "@/components/sections/avatar-section"
import { ConclusionSection } from "@/components/sections/conclusion"

export function ExhibitionPage() {
  return (
    <main>
      <Navigation />
      <LandingSection />
      <MoodboardSection />
      <ConceptBoardSection />
      <StoryboardSection />
      <DesignJourneySection />
      <FinalDesignSection />
      <AvatarSection />
      <ConclusionSection />
    </main>
  )
}
