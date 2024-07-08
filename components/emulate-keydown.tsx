"use client"

import React from "react"

const EmulateKeydown = ({ children, keyToEmulate }) => {
  const emulateKeyDown = () => {
    const key = keyToEmulate.toUpperCase()
    const keyCode = key.charCodeAt(0)

    const event = new KeyboardEvent("keydown", {
      key,
      code: `Key${key}`,
      keyCode,
      charCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(event)
  }

  const emulateDDown = () => {
    const event = new KeyboardEvent("keydown", {
      key: "D",
      code: "KeyD",
      keyCode: 68,
      charCode: 68,
      which: 68,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(event)
  }
  return <span onClick={emulateKeyDown}>{children}</span>
}

export default EmulateKeydown
