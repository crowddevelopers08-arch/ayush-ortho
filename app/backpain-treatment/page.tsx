
import { Header } from "@/components/header"
import { Backhero } from "@/components/backhero"
import Backreviews from "@/components/backreviews"
import Backthird from "@/components/backthird"
import BackcombinedComponent from "@/components/backcombined"
import Backcenterimg from "@/components/backcenterimg"
import Backfour from "@/components/backfour"
import Backsix from "@/components/backsix"
import WhatSetsUsApart from "@/components/WhatSetsUsApart"
import { Backfooter } from "@/components/backfooter"
import Backchatbot from "@/components/backchatbot"
import Backvideo from "@/components/backvideo"



export default function HomePage() {
  return (
    <>
    <main className="min-h-screen">
      <Header />
      <Backhero />
      <section id="treatments">
      <Backthird />
      
      </section>
            <Backfour />
 
        <Backsix />
        <Backcenterimg />
   <WhatSetsUsApart />
    <Backvideo />
      <section id="reviews">
      <Backreviews />
      </section>
      <section id="contacts">
      <BackcombinedComponent />
      </section>
      <Backchatbot />
     <Backfooter />
    </main>
    </>
  )
}
