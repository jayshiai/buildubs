"use client"

import React from "react"
//@ts-ignore
import { Torus as DubsTorus } from "dubsui/Extras"
import { useTheme } from "next-themes"

const Torus = () => {
  const { resolvedTheme } = useTheme()
  const [color, setColor] = React.useState("#fff")
  const [textColor, setTextColor] = React.useState("#000")

  React.useEffect(() => {
    if (resolvedTheme == "light") {
      setColor("#fff")
      setTextColor("#000")
    } else {
      setColor("#000")
      setTextColor("#fff")
    }
    console.log(resolvedTheme, color, textColor)
  }, [resolvedTheme])

  React.useEffect(() => {
    console.log("Color or TextColor changed:", { color, textColor })
  }, [color, textColor])
  return (
    <DubsTorus
      key={`${color}-${textColor}`}
      text={"3Dubs"}
      scale={[0.75, 3.25, 0]}
      color={color}
      textColor={textColor}
    />
  )
}

export default Torus
