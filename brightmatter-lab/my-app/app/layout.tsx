import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brightmatter Lab - Transformamos Ideas en Soluciones Digitales',
  description: 'Especialistas en desarrollo de software profesional. Creamos páginas web, aplicaciones móviles y plataformas empresariales que impulsan el crecimiento.',
  keywords: 'desarrollo software, páginas web, apps móviles, plataformas empresariales, República Dominicana',
  openGraph: {
    title: 'Brightmatter Lab',
    description: 'Transformamos ideas en soluciones digitales',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="font-sans antialiased bg-white text-ink">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}