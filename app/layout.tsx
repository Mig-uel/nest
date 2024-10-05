import '@/assets/styles/globals.css'
import Footer from '@/components/footer/footer.component'
import Navbar from '@/components/navbar/navbar.component'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nest',
  keywords: 'rental, properties, real estate',
  description: 'Find the perfect rental property',
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
export default MainLayout
