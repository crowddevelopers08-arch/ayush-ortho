import type { Metadata } from "next"
import RunningBar from "@/components/treatments/running-bar"
import HeroSection from "@/components/treatments/hero-section"
import TestimonialSection from "@/components/treatments/testimonial-section"
import PainSection from "@/components/treatments/pain-section"
import IntegratedApproachCta from "@/components/treatments/integrated-approach-cta"
import TreatmentDuration from "@/components/treatments/treatment-duration"
import BookingSection from "@/components/treatments/booking-section"
import BranchesFooter from "@/components/treatments/branches-footer"
import MobileCtaBar from "@/components/treatments/mobile-cta-bar"

export const metadata: Metadata = {
  title: "#1 Ortho Clinic in Chennai | Ayush Ortho Integrated Treatment",
  description:
    "Ayush Ortho Integrated Treatment - Ayurveda, Varma Therapy, Chiropractic Care and OMT. Get personalised integrated care for knee, back, neck, shoulder and other musculoskeletal concerns.",
}

export default function TreatmentsPage() {
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
