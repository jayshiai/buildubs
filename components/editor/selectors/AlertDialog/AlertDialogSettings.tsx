import React from "react"
import ButtonSvg from "@/public/icons/toolbox/button.svg"
import { Element, useEditor } from "@craftjs/core"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ToolbarItem, ToolbarSection } from "@/components/editor"
import { ToolbarRadio } from "@/components/editor/Toolbar/ToolbarRadio"

import { Text } from "../Text"

const TooltipCustom = ({ title, children, placement }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="z-[9999] bg-secondary"
          sideOffset={4}
          side={placement}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const AlertDialogSettings = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <React.Fragment>
      {/* <ToolbarSection title="Add Item" props={["itemsCount"]}>
        <div
          ref={(ref) => {
            let num = Math.random()
            console.log(num)
            create(
              ref,
              <AccordionItemNode value={num.toString()}>
                <AccordionTrigger>
                  <Text text="New Trigger" />
                </AccordionTrigger>
                <AccordionContent>
                  <Text text="New Content" />
                </AccordionContent>
              </AccordionItemNode>
            )
          }}
        >
          <TooltipCustom title="AccordionItem" placement="right">
            <div className="m-2 pb-2 cursor-move block">
              <ButtonSvg className="w-[22px] h-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>
      </ToolbarSection> */}
      <ToolbarSection
        title="Colors"
        props={["background", "color"]}
        summary={({ background, color }: any) => {
          return (
            <div className="flex flex-row-reverse">
              <div
                style={{
                  background:
                    background && `rgba(${Object.values(background)})`,
                }}
                className="flex-end flex h-6 w-6 items-center rounded-full bg-black text-center shadow-md"
              >
                <p
                  style={{
                    color: color && `rgba(${Object.values(color)})`,
                  }}
                  className="w-full text-center text-white"
                >
                  T
                </p>
              </div>
            </div>
          )
        }}
      >
        <ToolbarItem
          full={true}
          propKey="background"
          type="bg"
          label="Background"
        />
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
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
      <ToolbarSection title="Decoration">
        <ToolbarItem propKey="variant" type="radio" label="Style">
          <ToolbarRadio value="outline" label="Outline" />
          <ToolbarRadio value="default" label="Primary" />
          <ToolbarRadio value="secondary" label="Secondary" />
          <ToolbarRadio value="destructive" label="Destructive" />
        </ToolbarItem>
      </ToolbarSection>
    </React.Fragment>
  )
}
