import { Button, HoverCard } from "dubsui"
import { CalendarDays } from "lucide-react"

export default function HoverCardDemo() {
  return (
    <HoverCard trigger={<Button variant="link">@jayshiai</Button>}>
      <div className="flex justify-between space-x-4">
        <div className="h-10 w-10 rounded-full bg-orange-400"></div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@jayshiai</h4>
          <p className="text-sm">
            A Passionate Developer who loves to build things.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Born August 2004
            </span>
          </div>
        </div>
      </div>
    </HoverCard>
  )
}
