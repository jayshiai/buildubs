"use client"

import React from "react"
import { set } from "date-fns"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"

const NpmInstall = () => {
  const { toast } = useToast()
  const [hasCopied, setHasCopied] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 5000)
  }, [hasCopied])
  async function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    toast({
      description: "Copied to Clipboard!",
      className: "h-[50px]  bg-primary text-background",
    })
    setHasCopied(true)
  }
  return (
    <span
      onClick={() => copyToClipboard("npm install dubsui")}
      className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-4  font-mono text-white"
    >
      {hasCopied ? (
        <CheckIcon className=" h-4 w-4 " />
      ) : (
        <ClipboardIcon className=" h-4 w-4 " />
      )}
      npm install dubsui
    </span>
  )
}

export default NpmInstall
