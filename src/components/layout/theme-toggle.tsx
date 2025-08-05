'use client'


import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-muted/50 animate-pulse" />
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ease-in-out",
        isDark ? "bg-gray-900 border-2 border-primary/50" : "bg-muted border-2 border-border"
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "absolute left-2 h-4 w-4 text-yellow-400 transition-all duration-300 ease-in-out",
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute right-2 h-4 w-4 text-primary transition-all duration-300 ease-in-out",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        )}
      />
      <span
        className={cn(
          "absolute h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-1" : "translate-x-9"
        )}
      />
    </button>
  )
}
