'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import MobileNav from './MobileNav'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Equipo', href: '/equipo' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-lg' : 'py-4'
        } bg-white/95`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo con Image */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="relative w-8 h-8 sm:w-10 sm:h-10"
              >
                <Image
                  src="/logo.png"
                  alt="Brightmatter Lab Logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 32px, 40px"
                />
              </motion.div>
              <span className="text-lg sm:text-xl font-display font-bold gradient-text">
                Brightmatter Lab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium text-ink hover:text-primary-600 transition-colors focus-ring rounded-md px-3 py-2 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              
              <Link href="/contacto">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow focus-ring"
                >
                  Comenzar
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-primary-50 transition-colors focus-ring"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6 text-primary-600" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />
    </>
  )
}