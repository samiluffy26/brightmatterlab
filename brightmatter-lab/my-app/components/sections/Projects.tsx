'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { revealVariants } from '@/lib/animation-variants'

const projects = [
  {
    title: 'E-commerce Avanzado',
    description: 'Plataforma completa de comercio electrónico con gestión de inventario y pagos integrados.',
    tags: ['React', 'Strapi', 'Azure'],
    image: '/projects/ecommerce.jpg',
  },
  {
    title: 'Plataforma Educativa',
    description: 'Sistema integral para gestión académica y administrativa del sector educativo.',
    tags: ['Node.js', 'Mongodb', 'Vue'],
    image: '/projects/education.jpg',
  },
  {
    title: 'Plataforma Inmobiliaria',
    description: 'Sistema completo de préstamos y búsqueda avanzada de propiedades.',
    tags: ['React', 'Node.js', 'Mongodb'],
    image: '/projects/realestate.jpg',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">
            <span className="gradient-text">Proyectos Destacados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Algunas de nuestras soluciones más impactantes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <Card className="h-full group cursor-pointer overflow-hidden p-0">
                {/* Imagen del proyecto */}
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-3 text-ink group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-primary-50 text-primary-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/proyectos">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Ver Todos los Proyectos
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}