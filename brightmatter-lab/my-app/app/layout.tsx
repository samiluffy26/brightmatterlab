import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { DarkModeProvider } from '@/lib/DarkModeContext'
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
    <html lang="es" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#7C3AED" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-ink dark:text-gray-100 transition-colors duration-300">
        <DarkModeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </DarkModeProvider>
      </body>
    </html>
  )
}