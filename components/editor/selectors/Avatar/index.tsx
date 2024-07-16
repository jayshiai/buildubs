import React from "react"
import { Element, UserComponent, useNode } from "@craftjs/core"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { AvatarSettings } from "./AvatarSettings"

type AvatarProps = {
  margin?: any[]
  padding?: any[]
  size?: number[]
  link?: string
}

const AvatarNode: UserComponent<AvatarProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }))

  const { margin, size, link, padding, ...otherProps } = props
  return (
    <Avatar
      ref={connect}
      className="h-24 w-24 rounded-full"
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        height: `${size}px`,
        width: `${size}px`,
      }}
    >
      <AvatarImage src={link} />
      <AvatarFallback>avatar</AvatarFallback>
    </Avatar>
  )
}

AvatarNode.craft = {
  displayName: "Avatar",
  props: {
    size: [96],
    padding: ["0", "0", "0", "0"],
    margin: ["0", "0", "0", "0"],
    link: "/images/avatars/profile.jpg",
  },
  related: {
    toolbar: AvatarSettings,
  },
}

export default AvatarNode
