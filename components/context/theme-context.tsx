"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTheme as useNextTheme } from "next-themes"

interface Theme {
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  popover: string
  popoverForeground: string
  border: string
  input: string
  card: string
  cardForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  ring: string
  radius: string
}
interface ThemeContextType {
  theme: Theme
  updateTheme: (key: keyof Theme, value: string) => void
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

// Define light and dark themes
export const lightTheme: Theme = {
  background: "#ffffff",
  foreground: "#0f172a",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  popover: "#ffffff",
  popoverForeground: "#0f172a",
  border: "#e2e8f0",
  input: "#e2e8f0",
  card: "#ffffff",
  cardForeground: "#0f172a",
  primary: "#0f172a",
  primaryForeground: "#f8fafc",
  secondary: "#f1f5f9",
  secondaryForeground: "#0f172a",
  accent: "#f1f5f9",
  accentForeground: "#0f172a",
  destructive: "#ff0000",
  destructiveForeground: "#f8fafc",
  ring: "#94a3b8",
  radius: "0.5rem",
}

export const darkTheme: Theme = {
  background: "#030711",
  foreground: "#e1e7ef",
  muted: "#0f1629",
  mutedForeground: "#7f8ea3",
  popover: "#030711",
  popoverForeground: "#94a3b8",
  border: "#1d283a",
  input: "#1d283a",
  card: "#030711",
  cardForeground: "#e1e7ef",
  primary: "#f8fafc",
  primaryForeground: "#020205",
  secondary: "#0f172a",
  secondaryForeground: "#f8fafc",
  accent: "#1d283a",
  accentForeground: "#f8fafc",
  destructive: "#811d1d",
  destructiveForeground: "#f8fafc",
  ring: "#1d283a",
  radius: "0.5rem",
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme: nextTheme, resolvedTheme } = useNextTheme()

  // Retrieve saved theme from localStorage or use default based on resolvedTheme
  const getInitialTheme = (): Theme => {
    let storedTheme

    if (typeof window !== "undefined") {
      if (resolvedTheme === "dark") {
        storedTheme = localStorage.getItem("customDarkTheme")
      } else {
        storedTheme = localStorage.getItem("customLightTheme")
      }
    }

    if (storedTheme) {
      try {
        return JSON.parse(storedTheme) as Theme
      } catch (error) {
        console.error("Error parsing stored theme:", error)
      }
    }

    return resolvedTheme === "dark" ? darkTheme : lightTheme
  }

  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const camelToKebab = (str: string) => {
      return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    }
    // Apply custom theme variables
    for (const key in theme) {
      root.style.setProperty(
        `--${camelToKebab(key)}`,
        theme[key as keyof Theme]
      )
    }
  }, [theme])

  useEffect(() => {
    let storedTheme

    if (resolvedTheme === "dark") {
      storedTheme = localStorage.getItem("customDarkTheme")
    } else {
      storedTheme = localStorage.getItem("customLightTheme")
    }

    if (storedTheme) {
      console.log("shoulden'te be here")
      setTheme(JSON.parse(storedTheme) as Theme)
    } else {
      console.log(resolvedTheme)
      setTheme(resolvedTheme === "dark" ? darkTheme : lightTheme)
    }
    // Update the theme when the resolvedTheme changes
  }, [resolvedTheme])

  const updateTheme = (key: keyof Theme, value: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [key]: value,
    }))
    if (resolvedTheme === "light") {
      localStorage.setItem("customLightTheme", JSON.stringify(theme))
    } else {
      localStorage.setItem("customDarkTheme", JSON.stringify(theme))
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
