"use client"

import React, { useEffect, useState } from "react"
import { ChromePicker } from "react-color"

import { Label } from "@/components/ui/label"

export type ToolbarTextInputProps = {
  prefix?: string
  label?: string
  type: string
  onChange?: (value: any) => void
  value?: any
}

export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let val = value
    if (type === "color" || type === "bg") val = `rgba(${Object.values(value)})`
    setInternalValue(val)
  }, [value, type])

  return (
    <div
      className="relative w-full"
      onClick={() => {
        setActive(true)
      }}
    >
      {(type === "color" || type === "bg") && active ? (
        <div className="absolute left-[-5%] top-[calc(100%+10px)] z-[99999]">
          <div
            className="fixed left-0 top-0 h-full w-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setActive(false)
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb)
            }}
          />
        </div>
      ) : null}
      {label && (
        <Label className="relative left-[-12px] mb-1 text-lg text-foreground">
          {label}
        </Label>
      )}
      <div className="relative h-fit w-fit">
        <input
          type={type === "color" || type === "bg" ? "text" : type}
          className="mb-0 w-[calc(100%-28px)] rounded-full border-none bg-secondary py-2 pl-[28px] text-sm"
          value={internalValue || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange((e.target as any).value)
            }
          }}
          onChange={(e) => {
            setInternalValue(e.target.value)
          }}
          {...props}
        />
        {["color", "bg"].includes(type) && (
          <div
            className="absolute left-[8px] top-[50%] h-[12px] w-[12px] translate-y-[-50%] rounded-full"
            style={{ background: internalValue }}
          />
        )}
      </div>
    </div>
  )
}
