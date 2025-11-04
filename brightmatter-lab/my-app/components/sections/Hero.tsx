'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { heroVariants, heroChildVariants, buttonVariants } from '@/lib/animation-variants'
import MorphingBlob from '@/components/animations/MorphingBlob'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-400/5 to-accent-500/10 animate-gradient bg-300" />
      
      {/* Morphing blob */}
      <div className="absolute top-1/4 right-1/4 opacity-20">
        <MorphingBlob />
      </div>

      {/* Particles background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={heroChildVariants} className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Innovación Digital
              </span>
            </motion.div>

            <motion.h1
              variants={heroChildVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight"
            >
              <span className="block text-ink">Transformamos</span>
              <span className="block text-ink">Ideas en</span>
              <span className="block gradient-text">
                Soluciones Digitales
              </span>
            </motion.h1>

            <motion.p
              variants={heroChildVariants}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Especialistas en desarrollo de software profesional. 
              Creamos{' '}
              <span className="font-semibold text-primary-600">páginas web</span>,{' '}
              <span className="font-semibold text-accent-600">apps móviles</span> y{' '}
              <span className="font-semibold text-primary-600">plataformas empresariales</span>{' '}
              que impulsan el crecimiento de tu negocio.
            </motion.p>

            <motion.div variants={heroChildVariants} className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Ver Proyectos
              </Button>
              <Button variant="secondary" size="lg">
                Solicitar Servicio
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={heroChildVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
            >
              {[
                { value: '10+', label: 'Proyectos' },
                { value: '100%', label: 'Satisfacción' },
                { value: '24/7', label: 'Soporte' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-display font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Animated illustration placeholder */}
          <motion.div
            variants={heroChildVariants}
            className="relative h-96 lg:h-[600px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Replace with Lottie animation */}
              <div className="relative w-full h-full">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl blur-3xl opacity-20"
                />
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Tech icons grid */}
                  <div className="grid grid-cols-3 gap-8">
                    {['Code', 'Mobile', 'Cloud', 'Database', 'AI', 'Security'].map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.5,
                          type: 'spring',
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gradient-animated"
                      >
                        <span className="text-2xl font-bold gradient-text">
                          {tech[0]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-gray-500 font-medium">Scroll para explorar</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}