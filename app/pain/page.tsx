import type { Metadata } from "next"
import RunningBar from "@/components/pain/running-bar"
import HeroSection from "@/components/pain/hero-section"
import TestimonialSection from "@/components/pain/testimonial-section"
import PainSection from "@/components/pain/pain-section"
import IntegratedApproachCta from "@/components/pain/integrated-approach-cta"
import TreatmentDuration from "@/components/pain/treatment-duration"
import BookingSection from "@/components/pain/booking-section"
import BranchesFooter from "@/components/pain/branches-footer"
import MobileCtaBar from "@/components/pain/mobile-cta-bar"

export const metadata: Metadata = {
  title: "#1 Ortho Clinic in Tamil Nadu | Ayush Ortho Integrated Treatment",
  description:
    "Ayush Ortho Integrated Treatment - Ayurveda, Varma Therapy, Chiropractic Care and OMT. Get personalised integrated care for knee, back, neck, shoulder and other musculoskeletal concerns.",
}

export default function PainPage() {
  return (
    <div className="font-['Outfit',sans-serif]">
      <RunningBar />
      <HeroSection />
      <BookingSection />
      <TestimonialSection />
      <PainSection />
      <IntegratedApproachCta />
      <TreatmentDuration />
      <IntegratedApproachCta />
      <BranchesFooter />
      <MobileCtaBar />
    </div>
  )
}
