import { useEffect, useState } from "react"
import { ToggleGroup } from "dubsui"

export default function ToggleGroupDemo() {
  const [value, setValue] = useState("a")

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <ToggleGroup value={value} onValueChange={setValue} type="single">
      <div data-value="a">A</div>
      <div data-value="b">B</div>
      <div data-value="c">C</div>
    </ToggleGroup>
  )
}
