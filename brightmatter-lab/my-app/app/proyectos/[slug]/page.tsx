'use client'

import { use, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Check, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const project = PROJECTS.find((p) => p.slug === slug)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) {
    notFound()
  }

  // Crear array de imágenes para el carrusel
  // Si el proyecto tiene 'images', usa ese array
  // Si no, usa 'image' como un array de un solo elemento
  const images = project.images || [project.image]

  // Función para ir a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  // Función para ir a la imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-500 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Proyectos</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                  {project.category}
                </span>

                <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Cliente</p>
                    <p className="font-semibold">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Año</p>
                    <p className="font-semibold">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Categoría</p>
                    <p className="font-semibold">{project.category}</p>
                  </div>
                </div>
              </div>

              {/* Project Image Carousel */}
              <div className="relative h-96 bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 group">
                {/* DEBUG: Muestra cuántas imágenes hay */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded z-10">
                  {images.length} imagen(es)
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={currentImageIndex === 0}
                  />
                </div>

                {/* Navigation Buttons - SIEMPRE VISIBLES PARA PROBAR */}
                {images.length > 1 && (
                  <>
                    {/* Botón Anterior */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-xl z-10 border-2 border-gray-300"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    {/* Botón Siguiente */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-xl z-10 border-2 border-gray-300"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>

                    {/* Indicadores de puntos */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-10'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-extrabold mb-4">
              <span className="gradient-text">Resultados</span>
            </h2>
            <p className="text-xl text-gray-600">
              Impacto medible y resultados tangibles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-display font-bold gradient-text">
                    {result}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-display font-bold mb-6">
                Características Clave
              </h3>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-display font-bold mb-6">
                Tecnologías Utilizadas
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="px-6 py-3 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-full text-primary-700 font-semibold text-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {'testimonial' in project && project.testimonial && (
                <Card className="mt-8 bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
                  <div className="mb-4">
                    <svg
                      className="w-10 h-10 text-primary-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 italic mb-4">
                    "{project.testimonial.text}"
                  </p>
                  <div>
                    <p className="font-bold text-ink">
                      {project.testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {project.testimonial.role}
                    </p>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
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
              ¿Tienes un Proyecto Similar?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90"
                >
                  Contactar Ahora
                </Button>
              </Link>
              <Link href="/proyectos">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                  icon={<ExternalLink className="w-5 h-5" />}
                >
                  Ver Más Proyectos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}