import React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"

export const ClipboardButton = ({ copyCode, hasCopied, onCopy }) => {
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(copyCode)
    toast({
      description: "Copied to Clipboard!",
      className: "h-[50px] bg-primary text-background",
    })
    onCopy()
  }

  return (
    <span
      onClick={handleCopy}
      className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-background p-2 font-mono text-foreground"
    >
      {hasCopied ? (
        <CheckIcon className=" h-4 w-4" />
      ) : (
        <ClipboardIcon className=" h-4 w-4" />
      )}
    </span>
  )
}
