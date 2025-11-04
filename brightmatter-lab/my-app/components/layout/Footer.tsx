'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/brightmatter.lab', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:brightmatter.lab@outlook.com', label: 'Email' },
]

const footerLinks = [
  {
    title: 'Navegación',
    links: [
      { name: 'Inicio', href: '/' },
      { name: 'Proyectos', href: '/proyectos' },
      { name: 'Equipo', href: '/equipo' },
      { name: 'Servicios', href: '/servicios' },
      { name: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { name: 'Desarrollo Web', href: '/servicios#web' },
      { name: 'Apps Móviles', href: '/servicios#mobile' },
      { name: 'Plataformas', href: '/servicios#platforms' },
      { name: 'Mantenimiento', href: '/servicios#maintenance' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
            <div className="w-16 h-16 relative">
  <Image
    src="/logo-white.png"
    alt="Brightmatter Lab Logo"
    fill
    priority
    className="object-contain"
    sizes="64px"
  />
</div>       
              <span className="text-xl font-display font-bold">Brightmatter Lab</span>
            </Link>
            
            <p className="text-gray-400 leading-relaxed max-w-md">
              Transformamos ideas en soluciones digitales profesionales que impulsan el 
              crecimiento de tu negocio.
            </p>

            {/* Social links with micro-animations */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors focus-ring"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-400">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Phone className="w-5 h-5 text-primary-400" />
            </motion.div>
            <a href="tel:+18096572939" className="hover:text-white transition-colors">
              +1 809-657-2939
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Mail className="w-5 h-5 text-primary-400" />
            </motion.div>
            <a
              href="mailto:brightmatter.lab@outlook.com"
              className="hover:text-white transition-colors"
            >
              brightmatter.lab@outlook.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Brightmatter Lab. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}