import { Button, Tooltip } from "dubsui"

export default function TooltipDemo() {
  return (
    <Tooltip trigger={<Button variant="ghost">Tip</Button>}>
      This is a tooltip
    </Tooltip>
  )
}
