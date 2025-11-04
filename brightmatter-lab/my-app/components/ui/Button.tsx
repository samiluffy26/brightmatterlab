'use client'

import { motion } from 'framer-motion'
import { buttonVariants } from '@/lib/animation-variants'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  href,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all focus-ring gpu-accelerated relative overflow-hidden group'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-2xl hover:shadow-primary-500/50',
    secondary: 'bg-gradient-to-r from-accent-500 to-accent-400 text-white hover:shadow-2xl hover:shadow-accent-500/50',
    ghost: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Shimmer effect */}
      <span className="absolute inset-0 shimmer" />

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </Component>
  )
}