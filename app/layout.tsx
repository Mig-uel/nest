import '@/assets/styles/globals.css'
import Footer from '@/components/footer/footer.component'
import Navbar from '@/components/navbar/navbar.component'
import AuthProvider from '@/components/providers/auth-provider.component'
import { ToastContainer } from 'react-toastify'

import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Nest',
  keywords: 'rental, properties, real estate',
  description: 'Find the perfect rental property',
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}
export default MainLayout
