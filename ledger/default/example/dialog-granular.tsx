import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  // DialogPortal,
  // DialogOverlay,
  // DialogClose,
  DialogTrigger,
} from "dubsui"

export default function DialogGranular() {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button variant="outline">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[100px] border rounded-md p-4 font-mono font-thin">
          Reason?
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <Button variant={"outline"}>Cancle</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
