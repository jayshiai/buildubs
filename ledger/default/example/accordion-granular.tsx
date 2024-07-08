import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "dubsui"
import { ChevronDown } from "lucide-react"

export default function AccordionGranular() {
  return (
    <>
      <AccordionRoot type="single" collapsible className="w-full ">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Is it accessible?
            <ChevronDown className="w-5 h-5 ml-2" />
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Is it styled?
            <ChevronDown className="w-5 h-5 ml-2" />
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Is it animated?
            <ChevronDown className="w-5 h-5 ml-2" />
          </AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </>
  )
}
