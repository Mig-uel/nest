import '@/assets/styles/globals.css'
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
      </body>
    </html>
  )
}
export default MainLayout
