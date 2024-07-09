import React from "react"

const FancyText = ({ theme, fontFamily, text }) => {
  return (
    <div
      style={{
        //@ts-ignore
        "--c1": `${theme[0]}`,
        "--c2": `${theme[1]}`,
        "--c3": `${theme[2]}`,
      }}
      className={`${fontFamily} transText transBg flex h-full items-center justify-center`}
    >
      {text}
    </div>
  )
}

export default FancyText
