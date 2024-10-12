import Featured from '@/components/featured/featured.components'
import Hero from '@/components/hero/hero.component'
import InfoBoxes from '@/components/info-boxes/info-boxes.component'
import Recent from '@/components/recent/recent.properties'

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />

      <Featured />
      <Recent />
    </>
  )
}
export default HomePage
