import React from "react"
import ButtonSvg from "@/public/icons/toolbox/button.svg"
import SquareSvg from "@/public/icons/toolbox/rectangle.svg"
import TypeSvg from "@/public/icons/toolbox/text.svg"
import YoutubeSvg from "@/public/icons/toolbox/video-line.svg"
import { Element, useEditor } from "@craftjs/core"
import {
  ListCollapse,
  SeparatorHorizontal,
  ShieldAlert,
  User,
  User2,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ButtonNode } from "@/components/editor/selectors/Button"
import { Container } from "@/components/editor/selectors/Container"
import { Text } from "@/components/editor/selectors/Text"
import { Video } from "@/components/editor/selectors/Video"

import AccordionNode from "../selectors/Accordion"
import AlertDialogNode from "../selectors/AlertDialog"
import AvatarNode from "../selectors/Avatar"
import SeparatorNode from "../selectors/Separator"

const TooltipCustom = ({ title, children, placement }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="z-[9999] bg-secondary"
          sideOffset={4}
          side={placement}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <div
      className={`duration-400 flex h-full w-12 flex-col border-r bg-card transition-all ease-in-out ${
        enabled ? "opacity-100" : "opacity-0"
      } ${enabled ? "" : "w-0"}`}
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              />
            )
          }
        >
          <TooltipCustom title="Container" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <SquareSvg className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <TooltipCustom title="Text" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <TypeSvg className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>
        <div ref={(ref) => create(ref, <ButtonNode />)}>
          <TooltipCustom title="Button" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <ButtonSvg className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>

        <div ref={(ref) => create(ref, <AccordionNode />)}>
          <TooltipCustom title="Accordion" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <ListCollapse className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>
        <div ref={(ref) => create(ref, <AlertDialogNode />)}>
          <TooltipCustom title="Alert Dialog" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <ShieldAlert className="h-[22px] w-[22px]  text-gray-500" />
            </div>
          </TooltipCustom>
        </div>

        <div ref={(ref) => create(ref, <AvatarNode />)}>
          <TooltipCustom title="Avatar" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <User2 className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>

        <div ref={(ref) => create(ref, <SeparatorNode />)}>
          <TooltipCustom title="Separator" placement="right">
            <div className="m-2 block cursor-move pb-2">
              <SeparatorHorizontal className="h-[22px] w-[22px] fill-[#707070] text-gray-500" />
            </div>
          </TooltipCustom>
        </div>
      </div>
    </div>
  )
}
