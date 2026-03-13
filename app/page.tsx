
import Commonheader from "@/components/commonheader"
import CommonheroSection from "@/components/commonhero"
import Commonfour from "@/components/commonfour"
import Commonfive from "@/components/commonfive"
import Commontestimonials from "@/components/commonreview"
import Commonvideo from "@/components/commonvideo"
import Commonmap from "@/components/commonmap"
import Backthird from "@/components/backthird"
import Commonchatbot from "@/components/commonchatbot"
import StackedScrollCards from "@/components/commonthird"



export default function HomePage() {
  return (
    <>
    <main className="min-h-screen">
      <Commonheader />
      <CommonheroSection />
      <Commonfour />
      <StackedScrollCards />
      <Commonfive />
      <Commontestimonials /> 
      <Commonvideo /> 
      <Commonchatbot />
      <Commonmap />
    </main>
    </>
  )
}
