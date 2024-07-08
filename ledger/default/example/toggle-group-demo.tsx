import { useEffect, useState } from "react"
import { ToggleGroup } from "dubsui"

export default function ToggleGroupDemo() {
  const [value, setValue] = useState("a")

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <ToggleGroup value={value} onValueChange={setValue} type="single">
      <div value="a">A</div>
      <div value="b">B</div>
      <div value="c">C</div>
    </ToggleGroup>
  )
}
