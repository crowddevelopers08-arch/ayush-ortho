import type { Metadata } from "next"
import ThankYouContent from "@/components/treatments/thank-you-content"
import BranchesFooter from "@/components/treatments/branches-footer"

export const metadata: Metadata = {
  title: "Thank You | Ayush Ortho",
  description: "Your Ayush Ortho appointment booking has been received.",
  // A post-conversion page: keep it out of search results.
  robots: { index: false, follow: false },
}

export default function TreatmentsThankYouPage() {
  return (
    <div className="font-['Outfit',sans-serif]">
      <ThankYouContent />
      <BranchesFooter />
    </div>
  )
}
