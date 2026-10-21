import type { Metadata } from "next"
import Script from "next/script"
import ThankYouContent from "@/components/pain/thank-you-content"
import BranchesFooter from "@/components/pain/branches-footer"

export const metadata: Metadata = {
  title: "Thank You | Ayush Ortho",
  description: "Your Ayush Ortho appointment booking has been received.",
  // A post-conversion page: keep it out of search results.
  robots: { index: false, follow: false },
}

export default function PainThankYouPage() {
  return (
    <div className="font-['Outfit',sans-serif]">
      <Script id="pain-purchase-event" strategy="lazyOnload">
        {`fbq('track', 'Purchase');`}
      </Script>
      <ThankYouContent />
      <BranchesFooter />
    </div>
  )
}
