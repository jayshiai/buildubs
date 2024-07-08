import { Collapsible } from "dubsui"

export default function CollapsibleDemo() {
  return (
    <Collapsible
      title={
        <div className="w-full h-10 border rounded-lg flex justify-center items-center">
          Collapsible
        </div>
      }
      show={1}
    >
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @jayshiai/dubsui
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        devstomorrow/dubsui
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        3dubs/dubsui
      </div>
    </Collapsible>
  )
}
