'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { TEAM_MEMBERS } from '@/lib/constants'
import { revealVariants, staggerContainer } from '@/lib/animation-variants'

export default function EquipoPage() {
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
              <span className="gradient-text">Nuestro Equipo</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Profesionales apasionados por la tecnología y comprometidos con la
              excelencia en cada proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                custom={index}
                variants={revealVariants}
              >
                <Card className="h-full text-center group">
                  {/* Photo */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 overflow-hidden relative"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <h3 className="text-xl font-display font-bold mb-2 text-ink">
                    {member.name}
                  </h3>

                  <p className="text-primary-600 font-semibold mb-4">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center">
                    {'linkedin' in member.social && member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        whileHover={{ scale: 1.2, y: -4 }}
                        className="w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5 text-primary-600" />
                      </motion.a>
                    )}
                    {'github' in member.social && member.social.github && (
                      <motion.a
                        href={member.social.github}
                        whileHover={{ scale: 1.2, y: -4 }}
                        className="w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5 text-primary-600" />
                      </motion.a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-extrabold mb-4">
              <span className="gradient-text">Nuestros Valores</span>
            </h2>
            <p className="text-xl text-gray-600">
              Los principios que guían nuestro trabajo diario
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excelencia',
                description:
                  'Nos esforzamos por entregar la más alta calidad en cada línea de código.',
                icon: '🏆',
              },
              {
                title: 'Innovación',
                description:
                  'Adoptamos las últimas tecnologías para crear soluciones vanguardistas.',
                icon: '💡',
              },
              {
                title: 'Colaboración',
                description:
                  'Trabajamos en equipo con nuestros clientes para alcanzar sus objetivos.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center h-full">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-ink">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
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
              ¿Quieres Unirte al Equipo?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Siempre estamos buscando talento apasionado por la tecnología
            </p>
            <motion.a
              href="mailto:brightmatter.lab@outlook.com"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Enviar CV
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}