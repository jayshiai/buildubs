import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}


export const hexToHsl = (hex: string): string => {
  hex = hex.replace(/^#/, "")
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number, s: number, l: number
  l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
    }
    h /= 6
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `${h} ${s}% ${l}%`
}

export const hslToHex = (hslColor: string): string => {
  // Split the HSL string into components
  const [h, s, l] = hslColor.replace(/%/g, "").split(" ")

  // Convert HSL to RGB
  const h1 = parseInt(h) / 360
  const s1 = parseInt(s) / 100
  const l1 = parseInt(l) / 100

  let r, g, b

  if (s1 === 0) {
    r = g = b = l1 // Achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
 

    const q = l1 < 0.5 ? l1 * (1 + s1) : l1 + s1 - l1 * s1
    const p = 2 * l1 - q
    r = hue2rgb(p, q, h1 + 1 / 3)
    g = hue2rgb(p, q, h1)
    b = hue2rgb(p, q, h1 - 1 / 3)
  }

  // Convert RGB to Hexadecimal
  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return hexColor
}



