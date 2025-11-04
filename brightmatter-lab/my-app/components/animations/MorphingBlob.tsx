'use client'

import { motion } from 'framer-motion'

export default function MorphingBlob() {
  return (
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="20" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main morphing blob */}
      <motion.path
        d="M300,100 Q450,150 500,300 Q450,450 300,500 Q150,450 100,300 Q150,150 300,100 Z"
        fill="url(#blob-gradient)"
        filter="url(#glow)"
        animate={{
          d: [
            'M300,100 Q450,150 500,300 Q450,450 300,500 Q150,450 100,300 Q150,150 300,100 Z',
            'M300,80 Q470,180 520,300 Q470,420 300,520 Q130,420 80,300 Q130,180 300,80 Z',
            'M300,120 Q430,130 480,300 Q430,470 300,480 Q170,470 120,300 Q170,130 300,120 Z',
            'M300,100 Q450,150 500,300 Q450,450 300,500 Q150,450 100,300 Q150,150 300,100 Z',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner blob for depth */}
      <motion.path
        d="M300,180 Q380,200 420,300 Q380,400 300,420 Q220,400 180,300 Q220,200 300,180 Z"
        fill="white"
        opacity="0.2"
        animate={{
          d: [
            'M300,180 Q380,200 420,300 Q380,400 300,420 Q220,400 180,300 Q220,200 300,180 Z',
            'M300,160 Q400,220 440,300 Q400,380 300,440 Q200,380 160,300 Q200,220 300,160 Z',
            'M300,190 Q370,190 410,300 Q370,410 300,410 Q230,410 190,300 Q230,190 300,190 Z',
            'M300,180 Q380,200 420,300 Q380,400 300,420 Q220,400 180,300 Q220,200 300,180 Z',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Particles orbiting the blob */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 200
        return (
          <motion.circle
            key={i}
            cx={300}
            cy={300}
            r="4"
            fill="#10B981"
            opacity="0.6"
            animate={{
              cx: [
                300 + Math.cos(angle) * radius,
                300 + Math.cos(angle + Math.PI) * radius,
                300 + Math.cos(angle) * radius,
              ],
              cy: [
                300 + Math.sin(angle) * radius,
                300 + Math.sin(angle + Math.PI) * radius,
                300 + Math.sin(angle) * radius,
              ],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
        )
      })}
    </motion.svg>
  )
}