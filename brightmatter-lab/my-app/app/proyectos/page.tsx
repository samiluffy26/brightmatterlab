'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import Card from '@/components/ui/Card'
import { PROJECTS } from '@/lib/constants'
import { revealVariants, staggerContainer } from '@/lib/animation-variants'
import Image from 'next/image'

export default function ProyectosPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">
              <span className="gradient-text">Nuestros Proyectos</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Descubre cómo hemos ayudado a empresas a transformar sus ideas en
              soluciones digitales exitosas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.slug}
                custom={index}
                variants={revealVariants}
              >
                <Link href={`/proyectos/${project.slug}`}>
                  <Card className="h-full group cursor-pointer overflow-hidden p-0 hover:shadow-2xl transition-shadow">
                    {/* Project Image */}
                    <div className="relative h-64 bg-gradient-to-br from-primary-600 to-accent-500 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
  priority={index === 0}
/>
                      </motion.div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-700">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span>{project.tags[0]}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-display font-bold mb-3 text-ink group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                        <span>Ver Proyecto</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
              ¿Listo para tu Proyecto?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Cotización gratuita en 24 horas. Sin compromiso.
            </p>
            <Link href="/contacto">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
              >
                Iniciar Proyecto
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}