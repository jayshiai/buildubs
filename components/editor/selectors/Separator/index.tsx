import React from "react"
import { Element, UserComponent, useNode } from "@craftjs/core"

import { Separator } from "@/components/ui/separator"

import { SeparatorSettings } from "./SeparatorSettings"

type SeparatorProps = {
  margin?: any[]
  padding?: any[]
  size?: number[]
  orientation?: "horizontal" | "vertical"
}
const SeparatorNode: UserComponent<SeparatorProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))
  const { margin, padding, orientation, ...otherProps } = props
  return (
    <div
      ref={connect}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        height: `${orientation === "horizontal" ? "1px" : "100%"}`,
        width: `${orientation === "horizontal" ? "100%" : "1px"}`,
      }}
    >
      <Separator orientation={orientation} />
    </div>
  )
}

SeparatorNode.craft = {
  displayName: "Separator",
  props: {
    padding: ["0", "0", "0", "0"],
    margin: ["10", "0", "10", "0"],
    orientation: "horizontal",
  },
  related: {
    toolbar: SeparatorSettings,
  },
}
export default SeparatorNode
