import React from "react"
import { UserComponent, useNode } from "@craftjs/core"
import cx from "classnames"

import { Button } from "@/components/ui/button"

import { Text } from "../Text"
import { ButtonSettings } from "./ButtonSettings"

type ButtonProps = {
  background?: Record<"r" | "g" | "b" | "a", number>
  color?: Record<"r" | "g" | "b" | "a", number>
  buttonStyle?: string
  margin?: any[]
  text?: string
  textComponent?: any
}

export const ButtonNode: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))

  const { text, textComponent, color, children, ...otherProps } = props
  return (
    <Button
      ref={connect}
      className={cx([
        "rounded w-full px-4 py-2",
        {
          "shadow-lg": props.buttonStyle === "full",
        },
      ])}
      style={{
        backgroundColor:
          props.background && `rgba(${Object.values(props.background)})`,
        margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
      }}
      variant={props.buttonStyle}
      {...otherProps}
    >
      {children}
      <Text {...textComponent} text={text} color={color} />
    </Button>
  )
}

ButtonNode.craft = {
  displayName: "Button",
  props: {
    buttonStyle: "default",
    text: "Button",
    color: { r: 255, g: 255, b: 255, a: 1 },
    margin: ["5", "0", "5", "0"],
    textComponent: {
      ...Text.craft.props,
      textAlign: "center",
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
}
