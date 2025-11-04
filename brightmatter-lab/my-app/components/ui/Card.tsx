'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { cardVariants } from '@/lib/animation-variants'

interface CardProps {
  children: ReactNode
  className?: string
  withHoverGlow?: boolean
  with3D?: boolean
}

export default function Card({
  children,
  className = '',
  withHoverGlow = true,
  with3D = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !with3D) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        with3D
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      className={`
        relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden
        will-change-transform gpu-accelerated
        ${className}
      `}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #10B981)',
          opacity: 0,
          padding: '2px',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-white rounded-2xl" />
      </motion.div>

      {/* Glow effect on hover */}
      {withHoverGlow && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 blur-xl"
          style={{
            background: 'radial-gradient(circle at center, #7C3AED 0%, transparent 70%)',
          }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  )
}