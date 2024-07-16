import React, { useState } from "react"
import CustomizeIcon from "@/public/icons/customize.svg"
import LayerIcon from "@/public/icons/layers.svg"
import { useEditor } from "@craftjs/core"
import { Layers } from "@craftjs/layers"

import { Toolbar } from "@/components/editor/Toolbar"

import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true)
  const [toolbarVisible, setToolbarVisible] = useState(true)
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <div
      className={`w-72 border-l bg-card text-primary-foreground transition-all ${
        enabled ? "mr-0 opacity-100" : "-mr-72 opacity-0"
      }`}
    >
      <div className="flex h-full flex-col">
        <SidebarItem
          icon={CustomizeIcon}
          title="Customize"
          height={!layersVisible ? "full" : "55%"}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title="Layers"
          height={!toolbarVisible ? "full" : "45%"}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <div id="LayerContainer" className="mb-10">
            <Layers expandRootOnLoad={true} />
            <div className="h-16"></div>
          </div>
        </SidebarItem>
      </div>
    </div>
  )
}
