'use client'

import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '@/lib/DarkModeContext'

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode, mounted } = useDarkMode()

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 transition-colors focus-ring"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors focus-ring"
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      ) : (
        <Moon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      )}
    </button>
  )
}