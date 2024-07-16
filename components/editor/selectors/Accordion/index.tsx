import React, { useEffect, useState } from "react"
import { Element, UserComponent, useNode } from "@craftjs/core"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Text } from "../Text"
import { AccordionSettings } from "./AccordionSettings"

type AccordionProps = {
  background?: Record<"r" | "g" | "b" | "a", number>
  color?: Record<"r" | "g" | "b" | "a", number>
  margin?: any[]
  padding?: any[]
  children?: any
}

const AccordionNode: UserComponent<AccordionProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))

  const { color, items, padding, children, ...otherProps } = props
  return (
    <Accordion ref={connect} className="w-full" type="single" collapsible>
      <Element
        canvas
        is={AccordionItems}
        padding={padding}
        id="accordionCanvas"
      >
        <AccordionItemNode value="1">
          <AccordionTrigger>
            <Text text="All the text is editable" />
          </AccordionTrigger>
          <AccordionContent>
            <Text text="Just click on it and start editing!" />
          </AccordionContent>
        </AccordionItemNode>
        <AccordionItemNode value="2">
          <AccordionTrigger>
            <Text text="How do I install DubsUI?" />
          </AccordionTrigger>
          <AccordionContent>
            <Text text="Use command : 'npm install dubsui'" />
          </AccordionContent>
        </AccordionItemNode>
        <AccordionItemNode value="3">
          <AccordionTrigger>
            <Text text="Why is this builder glitchy?" />
          </AccordionTrigger>
          <AccordionContent>
            <Text text="Its still in experimental state, so expect some bugs." />
          </AccordionContent>
        </AccordionItemNode>
      </Element>
    </Accordion>
  )
}

export const AccordionItems = ({ children, padding, ...props }) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))

  return (
    <div
      ref={connect}
      style={{
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
      }}
    >
      {children}
    </div>
  )
}

AccordionItems.craft = {
  displayName: "AccordionItems",
  props: {
    margin: ["5", "0", "5", "0"],
    padding: ["15", "10", "15", "10"],
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
  },
  related: {
    toolbar: AccordionSettings,
  },
  // rules: {
  //   canMoveIn: (incomingNode) =>
  //     incomingNode.data.displayName === "AccordionItem",
  // },
}

export const AccordionItemNode = ({ children, value, ...props }) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))

  return (
    <AccordionItem ref={connect} value={value} {...props}>
      {children}
    </AccordionItem>
  )
}

AccordionItemNode.craft = {
  displayName: "AccordionItem",

  rules: {
    canDrop: (targetNode) => targetNode.data.displayName === "AccordionItems",
  },
}
AccordionNode.craft = {
  displayName: "Accordion",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    padding: ["15", "10", "15", "10"],
    margin: ["5", "0", "5", "0"],
  },
  related: {
    toolbar: AccordionSettings,
  },
}

export default AccordionNode
