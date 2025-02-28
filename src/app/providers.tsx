"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
  // Fix hydration issues by only rendering once mounted
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
} 