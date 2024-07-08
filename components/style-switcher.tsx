"use client"

import * as React from "react"
import { Style, styles } from "@/ledger/styles"
import { type SelectTriggerProps } from "@radix-ui/react-select"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "dubsui"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"

export function StyleSwitcher({ className, ...props }: SelectTriggerProps) {
  const [config, setConfig] = useConfig()

  return (
    <SelectRoot
      value={config.style}
      onValueChange={(value: Style["name"]) =>
        setConfig({
          ...config,
          style: value,
        })
      }
    >
      <SelectTrigger
        className={cn(
          "h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4",
          className
        )}
        {...props}
      >
        <span className="text-muted-foreground">Style: </span>
        <SelectValue placeholder="Select style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem key={style.name} value={style.name} className="text-xs">
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
