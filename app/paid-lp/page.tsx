import type { Metadata } from "next"
import RunningBar from "@/components/paid-lp/running-bar"
import HeroSection from "@/components/paid-lp/hero-section"
import TestimonialSection from "@/components/paid-lp/testimonial-section"
import PainSection from "@/components/paid-lp/pain-section"
import IntegratedApproachCta from "@/components/paid-lp/integrated-approach-cta"
import TreatmentDuration from "@/components/paid-lp/treatment-duration"
import VideoSection from "@/components/paid-lp/video-section"
import BranchesFooter from "@/components/paid-lp/branches-footer"
import MobileCtaBar from "@/components/paid-lp/mobile-cta-bar"

export const metadata: Metadata = {
  title: "#1 Ortho Clinic in Chennai | Ayush Ortho Integrated Treatment",
  description:
    "Ayush Ortho Integrated Treatment - Ayurveda, Varma Therapy, Chiropractic Care and OMT. Get personalised integrated care for knee, back, neck, shoulder and other musculoskeletal concerns.",
}

export default function PaidLpPage() {
  return (
    <div className="font-['Outfit',sans-serif]">
      <RunningBar />
      <HeroSection />
      <TestimonialSection />
      <PainSection />
      <IntegratedApproachCta />
      <TreatmentDuration />
      <IntegratedApproachCta />
      <VideoSection />
      <BranchesFooter />
      <MobileCtaBar />
    </div>
  )
}
