import React from "react"
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "dubsui"
import { Info } from "lucide-react"

const IComponent = ({ content }) => {
  return (
    <TooltipProvider delayDuration={100} key={"i"}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Info size={12} className="inline-block text-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export default IComponent
