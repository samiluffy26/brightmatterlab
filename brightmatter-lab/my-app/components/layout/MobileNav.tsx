'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { drawerVariants, drawerBackdropVariants } from '@/lib/animation-variants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navigation: Array<{ name: string; href: string }>
}

export default function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={drawerBackdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 dark:bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer with 3D effect */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto border-l border-gray-200 dark:border-gray-800"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors focus-ring"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-lg font-semibold text-ink dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all focus-ring"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <Link href="/contacto" onClick={onClose}>
                  <button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow focus-ring">
                    Comenzar Proyecto
                  </button>
                </Link>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Síguenos en:</p>
                <div className="flex gap-4">
                  {['instagram', 'linkedin', 'twitter'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 flex items-center justify-center transition-colors focus-ring"
                      aria-label={`Síguenos en ${social}`}
                    >
                      <span className="text-primary-600 dark:text-primary-400 capitalize text-sm font-medium">
                        {social[0].toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}