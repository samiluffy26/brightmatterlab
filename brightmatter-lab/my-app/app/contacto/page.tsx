'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { COMPANY } from '@/lib/constants'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    }, 3000)
  }

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
              <span className="gradient-text">Contáctanos</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Estamos listos para transformar tu idea en realidad. Conversemos
              sobre tu proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 text-ink">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Respuesta garantizada en menos de 24 horas. También puedes
                  contactarnos directamente por teléfono o email.
                </p>
              </div>

              {/* Contact Cards */}
              <Card className="group hover:border-primary-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Teléfono</h3>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="group hover:border-primary-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Email</h3>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="group hover:border-primary-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Ubicación</h3>
                    <p className="text-gray-600">
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="bg-gradient-to-br from-primary-50 to-accent-50">
                <h3 className="font-semibold text-ink mb-3">
                  Horario de Atención
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábado: 10:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="h-full">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-ink mb-2"
                      >
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-ink mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                          placeholder="juan@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-ink mb-2"
                        >
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                          placeholder="+1 809-000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-semibold text-ink mb-2"
                      >
                        Servicio de Interés *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      >
                        <option value="">Seleccionar servicio</option>
                        <option value="web">Desarrollo Web</option>
                        <option value="mobile">Aplicaciones Móviles</option>
                        <option value="platforms">Plataformas Empresariales</option>
                        <option value="maintenance">Mantenimiento & Bugs</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-ink mb-2"
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
                        placeholder="Cuéntanos sobre tu proyecto..."
                      />
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<Send className="w-5 h-5" />}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      Al enviar este formulario, aceptas nuestra política de
                      privacidad y que podamos contactarte.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-20 h-20 text-accent-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-ink mb-4">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-xl text-gray-600">
                      Gracias por contactarnos. Responderemos en menos de 24
                      horas.
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 h-96 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <p className="text-lg text-gray-700 font-semibold">
                  Santo Domingo, República Dominicana
                </p>
                <p className="text-gray-600 mt-2">
                  Mapa interactivo disponible próximamente
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}