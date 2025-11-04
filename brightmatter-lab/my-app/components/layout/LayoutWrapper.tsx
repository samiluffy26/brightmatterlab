'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/ui/Preloader'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Preloader />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}