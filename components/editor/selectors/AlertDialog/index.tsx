import React, { useEffect } from "react"
import { Element, UserComponent, useEditor, useNode } from "@craftjs/core"

import { Alert } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { Text } from "../Text"
import { AlertDialogSettings } from "./AlertDialogSettings"

type AlertDialogProps = {
  background?: Record<"r" | "g" | "b" | "a", number>
  color?: Record<"r" | "g" | "b" | "a", number>
  margin?: any[]
  padding?: any[]
  textComponent?: any
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
}

const AlertDialogNode: UserComponent<AlertDialogProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))
  const { color, items, textComponent, padding, variant, ...otherProps } = props

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={connect} asChild>
        <Button
          variant={variant}
          style={{
            margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
            padding: `${props.padding[0]}px ${props.padding[1]}px ${props.padding[2]}px ${props.padding[3]}px`,
          }}
        >
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AlertDialogNode.craft = {
  displayName: "AlertDialog",
  props: {
    variant: "default",
    margin: ["5", "0", "5", "0"],
    padding: ["15", "10", "15", "10"],
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    textComponent: {
      ...Text.craft.props,
      textAlign: "center",
    },
  },
  related: {
    toolbar: AlertDialogSettings,
  },
}

export default AlertDialogNode
