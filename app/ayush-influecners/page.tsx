import InfluencerHero from "@/components/influecners/influencer-hero"
import InfluencerStories from "@/components/influecners/influencer-stories"
import PainReliefSelector from "@/components/influecners/pain-relief-selector"
import WhyChooseAyush from "@/components/influecners/why-choose-ayush"
import SuccessJourney from "@/components/influecners/success-journey"
import PatientReviews from "@/components/influecners/patient-reviews"
import AppointmentCta from "@/components/influecners/appointment-cta"
import ContactActionBar from "@/components/influecners/contact-action-bar"
import Commonmap from "@/components/influecners/commonmap"
export default function AyushInfluencersPage() {
  return (
    <>
      <InfluencerHero />
      <InfluencerStories />
      <PainReliefSelector />
      <WhyChooseAyush />
      <SuccessJourney />
      <PatientReviews />
      <AppointmentCta />
      <Commonmap />
      <ContactActionBar />
    </>
  )
}
