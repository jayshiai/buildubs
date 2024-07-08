import { Button, Dialog } from "dubsui"

export default function DialogDemo() {
  return (
    <Dialog
      title="Dubsui Flavours"
      description="These are fictional flavours of dubsui."
      trigger={<Button variant="outline">Select Flavour</Button>}
    >
      <div className="rounded-md cursor-pointer border px-4 py-3 font-mono text-sm">
        @jayshiai/dubsui
      </div>
      <div className="rounded-md cursor-pointer border px-4 py-3 font-mono text-sm">
        devstomorrow/dubsui
      </div>
      <div className="rounded-md cursor-pointer border px-4 py-3 font-mono text-sm">
        3dubs/dubsui
      </div>
    </Dialog>
  )
}
