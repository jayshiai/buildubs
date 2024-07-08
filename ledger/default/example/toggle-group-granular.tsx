import { useEffect, useState } from "react"
import { ToggleGroupItem, ToggleGroupRoot } from "dubsui"

export default function ToggleGroupGranular() {
  const [value, setValue] = useState(["a"])

  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <ToggleGroupRoot value={value} onValueChange={setValue} type="multiple">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroupRoot>
  )
}
