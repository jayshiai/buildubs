import React, { useEffect, useState } from "react"
import { Button } from "dubsui"

const SaveTheme = ({ onClick, text, clickedText, variant, className }) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setClicked(false)
    }, 2000)
  }, [clicked])
  return (
    <Button
      variant={variant}
      onClick={() => {
        onClick()
        setClicked(true)
      }}
      className={className}
    >
      {clicked ? clickedText : text}
    </Button>
  )
}

export default SaveTheme
