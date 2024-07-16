import React from "react"
import { useNode } from "@craftjs/core"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null
        return res
      }, {}),
  }))
  return (
    <>
      <Collapsible>
        <CollapsibleTrigger className=" w-full bg-background px-6 transition-all data-[state=closed]:py-2 data-[state=open]:py-6">
          <div className="flex w-full justify-between">
            <h5 className="text-dark-gray text-left text-sm font-medium text-foreground">
              {title}
            </h5>
            {summary && props ? (
              <h5 className="text-dark-blue text-right text-sm text-muted-foreground">
                {summary(
                  props.reduce((acc: any, key: any) => {
                    acc[key] = nodeProps[key]
                    return acc
                  }, {})
                )}
              </h5>
            ) : null}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className=" px-6 pb-5 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=closed]:overflow-hidden">
          <div className="flex flex-wrap">{children}</div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
    </>
  )
}
