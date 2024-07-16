import React from "react"
import ButtonSvg from "@/public/icons/toolbox/button.svg"
import { Element, useEditor } from "@craftjs/core"

import { ToolbarItem, ToolbarSection } from "@/components/editor"

export const AvatarSettings = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <React.Fragment>
      <ToolbarSection title="Link" props={["link"]}>
        <ToolbarItem full={true} propKey="link" type="text" label="Link" />
      </ToolbarSection>
      <ToolbarSection
        title="Margin"
        props={["margin"]}
        summary={({ margin }: any) => {
          return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
            margin[3] || 0
          }px`
        }}
      >
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection
        title="Padding"
        props={["padding"]}
        summary={({ padding }: any) => {
          return `${padding[0] || 0}px ${padding[1] || 0}px ${
            padding[2] || 0
          }px ${padding[3] || 0}px`
        }}
      >
        <ToolbarItem propKey="padding" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="padding" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="padding" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection
        title="Size"
        props={["size"]}
        summary={({ size }: any) => {
          return `${size}px`
        }}
      >
        <ToolbarItem propKey="size" index={0} type="slider" label="Size" />
      </ToolbarSection>
    </React.Fragment>
  )
}
