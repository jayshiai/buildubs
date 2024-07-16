import React from "react"
import Checkmark from "@/public/icons/check.svg"
import Customize from "@/public/icons/customize.svg"
import RedoSvg from "@/public/icons/toolbox/redo.svg"
import UndoSvg from "@/public/icons/toolbox/undo.svg"
import { useEditor } from "@craftjs/core"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const shiki = require("shiki")

const containerStyle = (props, level) => `
  ${indent(level)} display: flex;
  ${indent(level)} flex-direction: ${props.flexDirection};
  ${indent(level)} align-items: ${props.alignItems};
  ${indent(level)} justify-content: ${props.justifyContent};
  ${indent(level)} padding: ${props.padding.map((p) => `${p}px`).join(" ")};
  ${indent(level)} margin: ${props.margin.map((m) => `${m}px`).join(" ")};
  ${indent(level)} background: rgba(${props.background.r}, ${
  props.background.g
}, ${props.background.b}, ${props.background.a});
  ${indent(level)} color: rgba(${props.color.r}, ${props.color.g}, ${
  props.color.b
}, ${props.color.a});
  ${indent(level)} box-shadow: 0px 0px ${props.shadow}px rgba(0, 0, 0, 0.5);
  ${indent(level)} border-radius: ${props.radius}px;
  ${indent(level)} width: ${props.width};
  ${indent(level)} height: ${props.height};
`

const textStyle = (props, level) => `
  ${indent(level)} font-size: ${props.fontSize}px;
  ${indent(level)} text-align: ${props.textAlign};
  ${indent(level)} font-weight: ${props.fontWeight};
  ${indent(level)} color: rgba(${props.color.r}, ${props.color.g}, ${
  props.color.b
}, ${props.color.a});
  ${indent(level)} margin: ${props.margin.map((m) => `${m}px`).join(" ")};
  ${indent(level)} text-shadow: 0px 0px ${props.shadow[0]}px rgba(0, 0, 0, 0.5);
`

const separatorStyle = (props) => `
  margin: ${props.margin.map((m) => `${m}px`).join(" ")};
`

const indent = (level) => "  ".repeat(level)

const generateJSX = (node, data, level = 0) => {
  const { type, props, nodes, displayName } = node
  let children = ""

  if (nodes && nodes.length > 0) {
    children = nodes
      .map((childId) => generateJSX(data[childId], data, level + 1))
      .join("\n")
  }

  switch (type.resolvedName) {
    case "Container":
      return `${indent(level)}<div style="${containerStyle(
        props,
        level
      )}${indent(level)}">\n${children}\n${indent(level)}</div>`
    case "Text":
      return `${indent(level)}<p style="${textStyle(props, level)}${indent(
        level
      )}">\n${indent(level)}${props.text}\n${indent(level)}</p>`
    case "SeparatorNode":
      return `${indent(level)}<hr style="${separatorStyle(props)}" />`
    default:
      return ""
  }
}

const generateCode = (data) => {
  // console.log(data)
  const codeString = generateJSX(data.ROOT, data)

  return codeString
}

export const Header = () => {
  const { enabled, query, canUndo, canRedo, actions } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  )
  const [code, setCode] = React.useState(null)
  const [highlightedCode, setHighlightedCode] = React.useState("")
  const highlightCode = async (code) => {
    // shiki
    //   .getHighlighter({
    //     theme: "nord",
    //   })
    //   .then((highlighter) => {
    //     console.log(
    //       highlighter.codeToHtml(`console.log('shiki');`, { lang: "js" })
    //     )
    //   })
    setHighlightedCode(code)
    //   await codeToHtml(code, {
    //     lang: "javascript",
    //     theme: "vitesse-dark",
    //   }).then((html) => {
    //     setHighlightedCode(html)
    //   })
  }
  React.useEffect(() => {
    if (code) {
      highlightCode(code)
    }
  }, [code])
  return (
    <div className="relative z-50 flex h-11 w-full border-b bg-background px-2 text-white">
      <div className="flex w-full items-center justify-end px-4">
        {enabled && (
          <div className="flex flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`mr-2 cursor-pointer ${
                      !canUndo ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => canUndo && actions.history.undo()}
                  >
                    <UndoSvg className="h-5 w-5 fill-current text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`mr-2 cursor-pointer ${
                      !canRedo ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => canRedo && actions.history.redo()}
                  >
                    <RedoSvg className="h-5 w-5 fill-current text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <div className="flex gap-2">
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="ml-2"
                  onClick={() => {
                    const CodeString = generateCode(query.getSerializedNodes())

                    setCode(CodeString)
                  }}
                >
                  Code
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Generated Code</SheetTitle>
                  <SheetDescription>
                    This code is NOT perfect and is in experimental state. You
                    can paste and open it in a HTML file, but the dubsui
                    components are not yet supported.
                  </SheetDescription>
                </SheetHeader>
                <div>
                  {highlightedCode && ( // <div
                    //   className="overflow-x-auto rounded-md  p-4 font-mono text-xs text-white"
                    //   dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    // />
                    <pre className="overflow-x-auto rounded-md  p-4 font-mono text-xs text-white">
                      {" "}
                      {code}
                    </pre>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div
            className={cn(
              `flex cursor-pointer items-center rounded px-4 py-1 text-sm  transition ${
                enabled
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-foreground text-background"
              }`
            )}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled))
            }}
          >
            {enabled ? (
              <Checkmark
                className={`mr-1 h-3 w-3  ${
                  enabled ? "fill-secondary-foreground" : "fill-background"
                }`}
              />
            ) : (
              <Customize
                className={`mr-1 h-3 w-3  ${
                  enabled ? "fill-secondary-foreground" : "fill-background"
                }`}
              />
            )}
            {enabled ? "Finish Editing" : "Edit"}
          </div>
        </div>
      </div>
    </div>
  )
}
