"use client"

import React from "react"
import AccordionDemo from "@/ledger/default/example/accordion-demo"
import AlertDialogDemo from "@/ledger/default/example/alert-dialog-demo"
import AvatarDemo from "@/ledger/default/example/avatar-demo"
import BreadcrumbDemo from "@/ledger/default/example/breadcrumb-demo"
import ButtonDemo from "@/ledger/default/example/button-demo"
import ButtonVariants from "@/ledger/default/example/button-variants"
import CollapsibleDemo from "@/ledger/default/example/collapsible-demo"
import ContextMenuDemo from "@/ledger/default/example/context-menu-demo"
import DialogDemo from "@/ledger/default/example/dialog-demo"
import DropdownMenuDemo from "@/ledger/default/example/dropdown-menu-demo"
import HoverCardDemo from "@/ledger/default/example/hover-card-demo"
import MenubarDemo from "@/ledger/default/example/menubar-demo"
import PopoverDemo from "@/ledger/default/example/popover-demo"
import ProgressDemo from "@/ledger/default/example/progress-demo"
import ScrollAreaDemo from "@/ledger/default/example/scrollarea-demo"
import SelectDemo from "@/ledger/default/example/select-demo"
import SeparatorDemo from "@/ledger/default/example/separator-demo"
import SliderDemo from "@/ledger/default/example/slider-demo"
import ToggleDemo from "@/ledger/default/example/toggle-demo"
import ToggleGroupDemo from "@/ledger/default/example/toggle-group-demo"
import TooltipDemo from "@/ledger/default/example/tooltip-demo"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

const page = () => {
  return (
    <div className="container">
      <div className="grid gap-4">
        <div className="mt-2">
          <h1 className="text-3xl font-bold">Themer</h1>
          <p>Checkout how your theme looks for all components in one place.</p>
        </div>
        <div className="grid grid-cols-3 items-start gap-4">
          <div className="grid gap-4">
            <ComponentWrapper>
              <Card className="w-full p-4">
                <AccordionDemo />
              </Card>
            </ComponentWrapper>
            <ComponentWrapper className=" justify-start">
              <AlertDialogDemo />
              <ButtonDemo />
              <AvatarDemo className="h-12 w-12" />
            </ComponentWrapper>
            <ComponentWrapper>
              <CollapsibleDemo />
            </ComponentWrapper>
          </div>
          <div className="grid gap-4">
            <ComponentWrapper>
              <Card className="w-full p-4">
                <BreadcrumbDemo />
              </Card>
            </ComponentWrapper>
            <ComponentWrapper className=" justify-start">
              <div className="rounded-md  border">
                <MenubarDemo />
              </div>
              <DropdownMenuDemo />
              <ToggleDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <Card className="w-full p-4">
                <ButtonVariants />
              </Card>
            </ComponentWrapper>
          </div>
          <div className="grid gap-4">
            <ComponentWrapper>
              <TooltipDemo />
              <HoverCardDemo />
              <ProgressDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <div className=" flex flex-col items-start gap-2">
                <DialogDemo />
                <SelectDemo />
                <PopoverDemo />
              </div>
              <ContextMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <ScrollAreaDemo />
              <div className="flex flex-col items-start gap-10">
                <ToggleGroupDemo />
                <SeparatorDemo />
                <SliderDemo />
              </div>
            </ComponentWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentWrapper({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 rounded-md p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export default page
