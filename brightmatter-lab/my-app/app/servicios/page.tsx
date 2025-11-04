'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { SERVICES, FAQ_DATA } from '@/lib/constants'
import { revealVariants, staggerContainer } from '@/lib/animation-variants'

export default function ServiciosPage() {
  const ref = useRef(null)
  const faqRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isFaqInView = useInView(faqRef, { once: true, margin: '-100px' })

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-6">
              <span className="gradient-text">Nuestros Servicios</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Soluciones tecnológicas completas para impulsar tu negocio al
              siguiente nivel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - RESPONSIVE MEJORADO */}
      <section className="py-12 sm:py-16 lg:py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                variants={revealVariants}
              >
                <Card className="h-full" withHoverGlow with3D>
                  {/* Header con precio */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink">
                      {service.title}
                    </h3>
                    <span className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full text-sm font-bold whitespace-nowrap self-start sm:self-auto">
                      {service.pricing}
                    </span>
                  </div>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-ink mb-3 text-sm sm:text-base">
                      Lo que incluye:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm sm:text-base text-gray-600"
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-ink mb-3 text-sm sm:text-base">
                      Tecnologías:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/contacto?servicio=${service.id}`}>
                    <Button
                      variant="primary"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                    >
                      Solicitar Cotización
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section - RESPONSIVE MEJORADO */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-4">
              <span className="gradient-text">Nuestro Proceso</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Metodología probada para garantizar el éxito
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Descubrimiento',
                description: 'Entendemos tus necesidades y objetivos',
              },
              {
                step: '02',
                title: 'Planificación',
                description: 'Diseñamos la arquitectura y estrategia',
              },
              {
                step: '03',
                title: 'Desarrollo',
                description: 'Construimos tu solución con calidad',
              },
              {
                step: '04',
                title: 'Lanzamiento',
                description: 'Desplegamos y brindamos soporte continuo',
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center h-full">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold gradient-text mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-ink">
                    {phase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">{phase.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - RESPONSIVE MEJORADO */}
      <section className="py-12 sm:py-16 lg:py-20" ref={faqRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-4">
              <span className="gradient-text">Preguntas Frecuentes</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Respuestas a las dudas más comunes
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card>
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-ink">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - RESPONSIVE MEJORADO */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-500 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-4 sm:mb-6">
              ¿Listo para Empezar?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
              Cotización gratuita en 24 horas. Sin compromiso.
            </p>
            <Link href="/contacto">
              <Button
                variant="ghost"
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Solicitar Cotización
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}