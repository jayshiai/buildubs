import React from "react"
import { useNode } from "@craftjs/core"

import { RadioGroup } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

import { ToolbarDropdown } from "./ToolbarDropdown"
import { ToolbarTextInput } from "./ToolbarTextInput"

export type ToolbarItemProps = {
  prefix?: string
  label?: string
  full?: boolean
  propKey?: string
  index?: number
  children?: React.ReactNode
  type: string
  onChange?: (value: any) => any
}
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }))
  const value = Array.isArray(propValue) ? propValue[index] : propValue

  return (
    <div
      className={`${full ? "max-w-full basis-full" : " max-w-1/2 basis-1/2"}`}
    >
      <div className="mb-2">
        {["text", "color", "bg", "number"].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value
                } else {
                  props[propKey] = onChange ? onChange(value) : value
                }
              }, 500)
            }}
          />
        ) : type === "slider" ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}

            <Slider
              className=" input-slider w-9/12"
              defaultValue={[value]}
              onValueChange={(value) => {
                setProp((props: any) => {
                  if (Array.isArray(propValue)) {
                    props[propKey][index] = onChange ? onChange(value) : value
                  } else {
                    props[propKey] = onChange ? onChange(value[0]) : value[0]
                  }
                }, 1000)
              }}
            />
          </>
        ) : type === "radio" ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            {/* <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup> */}
            <RadioGroup
              defaultValue={value || 0}
              onValueChange={(value) => {
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value
                })
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type === "select" ? (
          <ToolbarDropdown
            value={value || ""}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : null}
      </div>
    </div>
  )
}
