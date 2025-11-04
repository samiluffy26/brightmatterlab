'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { revealVariants } from '@/lib/animation-variants'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}