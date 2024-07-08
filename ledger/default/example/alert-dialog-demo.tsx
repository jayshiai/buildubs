import { AlertDialog, Button } from "dubsui"

export default function AlertDialogDemo() {
  const props = {
    dialogTitle: "Are you absolutely sure?",
    dialogDescription:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    trigger: <Button variant="destructive">Dialog</Button>,
    cancelVariant: "outline",
    actionVariant: "destructive",
    actionText: "Continue",
    cancelText: "Back",
    buttonSize: "default",
  }
  return <AlertDialog {...props} />
}
