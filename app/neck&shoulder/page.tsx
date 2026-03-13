
import Commonfour from "@/components/commonfour"
import Commonchatbot from "@/components/commonchatbot"
import StackedScrollCards from "@/components/commonthird"
import { Neckheader } from "@/components/neckheader"
import { Neckfooter } from "@/components/neckfooter"
import Neckreviews from "@/components/neckreviews"
import { Neckhero } from "@/components/neckhero"
import Neckchatbot from "@/components/neckchatbot"
import NeckcombinedComponent from "@/components/neckcombined"
import Backthird from "@/components/backthird"
import Neckthird from "@/components/neckthird"
import Neckfour from "@/components/neckfour"
import Neckfive from "@/components/neckfive"
import Necksix from "@/components/necksix"
import Neckvideo from "@/components/neckvideo"

export default function HomePage() {
  return (
    <>
    <main className="min-h-screen">
      <Neckheader />
      <Neckhero />
      <Neckthird />
      <Neckfive />
            <Necksix />
      <Neckfour />
      <Neckvideo />
      <Neckreviews />
      <NeckcombinedComponent />
      <Neckfooter />
      <Neckchatbot />
    </main>
    </>
  )
}
