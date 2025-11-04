'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Smartphone, Server, Wrench } from 'lucide-react'
import Card from '@/components/ui/Card'
import { staggerContainer, revealVariants } from '@/lib/animation-variants'

const features = [
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Desarrollo de sitios web profesionales, responsivos y optimizados para SEO.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Smartphone,
    title: 'Apps Móviles',
    description: 'Aplicaciones nativas e híbridas para iOS y Android con experiencias excepcionales.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Server,
    title: 'Plataformas Empresariales',
    description: 'Sistemas internos, plataformas educativas y soluciones empresariales a medida.',
    color: 'from-primary-600 to-accent-500',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento & Bugs',
    description: 'Reestructuración de plataformas existentes y resolución de problemas técnicos.',
    color: 'from-accent-600 to-primary-500',
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">
            <span className="gradient-text">Nuestros Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones tecnológicas integrales que transforman ideas en productos digitales exitosos
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} custom={index} variants={revealVariants}>
              <Card withHoverGlow with3D className="h-full hover:border-gradient-animated">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 text-ink">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated arrow on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-4 flex items-center gap-2 text-primary-600 font-semibold"
                >
                  <span>Saber más</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10+', label: 'Proyectos Completados' },
            { value: '100%', label: 'Satisfacción' },
            { value: '24/7', label: 'Soporte' },
            { value: '1', label: 'Años de Experiencia' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
              className="text-center group cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl md:text-5xl font-display font-extrabold gradient-text mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-600 text-sm font-medium group-hover:text-primary-600 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}