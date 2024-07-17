import React from "react"
import Checkmark from "@/public/icons/check.svg"
import Customize from "@/public/icons/customize.svg"
import RedoSvg from "@/public/icons/toolbox/redo.svg"
import UndoSvg from "@/public/icons/toolbox/undo.svg"
import { useEditor } from "@craftjs/core"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import HTML from "highlight.js/lib/languages/xml"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"

import "highlight.js/styles/atom-one-dark.css"
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

const containerStyle = (props, level) => `
  ${indent(level)} display: "flex",
  ${indent(level)} flexDirection: "${props.flexDirection}",
  ${indent(level)} alignItems: "${props.alignItems}",
  ${indent(level)} justifyContent: "${props.justifyContent}",
  ${indent(level)} padding: "${props.padding.map((p) => `${p}px`).join(" ")}",
  ${indent(level)} margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
  ${indent(level)} background: "rgba(${props.background.r}, ${
  props.background.g
}, ${props.background.b}, ${props.background.a})",
  ${indent(level)} color: "rgba(${props.color.r}, ${props.color.g}, ${
  props.color.b
}, ${props.color.a})",
  ${indent(level)} boxShadow: "0px 0px ${props.shadow}px rgba(0, 0, 0, 0.5)",
  ${indent(level)} borderRadius: "${props.radius}px",
  ${indent(level)} width: "${props.width}",
  ${indent(level)} height: "${props.height}",
`

const textStyle = (props, level) => `
  ${indent(level)} fontSize: "${props.fontSize}px",
  ${indent(level)} textAlign: "${props.textAlign}",
  ${indent(level)} fontWeight: "${props.fontWeight}",
  ${indent(level)} color: "rgba(${props.color.r}, ${props.color.g}, ${
  props.color.b
}, ${props.color.a})",
  ${indent(level)} margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
  ${indent(level)} textShadow: "0px 0px ${
  props.shadow[0]
}px rgba(0, 0, 0, 0.5)",
`

const separatorStyle = (props) => `
  margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
`

const indent = (level) => "  ".repeat(level)
const fnString1 = `
const MyComponent = () => {
  return (
  
  `
const fnString2 = ` )
}

export default MyComponent
`

const generateJSX = (node, data, level = 0, imports = new Set()) => {
  const { type, props, nodes, linkedNodes, displayName } = node
  let children = ""

  if (nodes && nodes.length > 0) {
    children = nodes
      .map((childId) => generateJSX(data[childId], data, level + 1, imports))
      .join("\n")
  }

  switch (type.resolvedName) {
    case "Container":
      return ` ${indent(level)} <div style={{${containerStyle(
        props,
        level
      )}}} ${indent(level)} > \n${children}\n ${indent(level)} </div>`
    case "Text":
      return ` ${indent(level)} <p style={{${textStyle(
        props,
        level
      )}}} ${indent(level)} >\n ${indent(level)} ${props.text}\n ${indent(
        level
      )} </p>`
    case "SeparatorNode":
      imports.add("Separator")
      return ` ${indent(level)} <Separator style={{${separatorStyle(
        props
      )}}} />`
    case "ButtonNode":
      imports.add("Button")
      return `
      <Button
      className="rounded w-full px-4 py-2"
      style={{
        backgroundColor: "rgba(${props.color.r}, ${props.color.g}, ${
        props.color.b
      }, ${props.color.a})",
        margin: "${props.margin.map((m) => `${m}px`).join(" ")}",       
      }}
      variant={"${props.buttonStyle}"}     
    >
      <p
      style={{
        color: "rgba(${props.textComponent.color.r}, ${
        props.textComponent.color.g
      }, ${props.textComponent.color.b}, ${props.textComponent.color.a})",
        margin: "${props.textComponent.margin.map((m) => `${m}px`).join(" ")}",
        textShadow: "0px 0px ${
          props.textComponent.shadow
        }px rgba(0, 0, 0, 0.5)",
        fontSize: "${props.textComponent.fontSize}px",
        textAlign: "${props.textComponent.textAlign}",
        fontWeight: "${props.textComponent.fontWeight}",
      }} 
       > ${props.text}</p>
    </Button>
    `
    case "AvatarNode":
      imports.add("AvatarRoot")
      imports.add("AvatarImage")
      imports.add("AvatarFallback")
      return `
      <AvatarRoot
      className="h-24 w-24 rounded-full"
      style={{
        margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
        padding: "${props.padding.map((p) => `${p}px`).join(" ")}",
        height: "${props.size}px",
        width: "${props.size}px",
      }}
      >
        <AvatarImage src={"${props.link.replace(" ", "")}"} />
        <AvatarFallback>avatar</AvatarFallback>
      </AvatarRoot>`
    case "AlertDialogNode":
      imports.add("AlertDialogRoot")
      imports.add("AlertDialogTrigger")
      imports.add("AlertDialogContent")
      imports.add("AlertDialogHeader")
      imports.add("AlertDialogTitle")
      imports.add("AlertDialogDescription")
      imports.add("AlertDialogFooter")
      imports.add("AlertDialogCancel")
      imports.add("AlertDialogAction")
      imports.add("Button")
      return `
      <AlertDialogRoot>
        <AlertDialogTrigger asChild>
          <Button
            variant={"${props.variant}"}
            style={{
              margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
              padding: "${props.padding.map((p) => `${p}px`).join(" ")}",
            }}
          >
            Show Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>`
    case "AccordionNode":
      if (
        data[linkedNodes.accordionCanvas].nodes &&
        data[linkedNodes.accordionCanvas].nodes.length > 0
      ) {
        imports.add("AccordionRoot")
        imports.add("AccordionItem")
        imports.add("AccordionTrigger")
        imports.add("AccordionContent")
        return `
      <AccordionRoot style={{width:"100%"}}  type="single" collapsible>
        ${data[linkedNodes.accordionCanvas].nodes
          .map((childId) =>
            generateJSX(data[childId], data, level + 1, imports)
          )
          .join("\n")}
      </AccordionRoot>
      `
      } else {
        return "{/* Add Accordion Items */}"
      }
    case "AccordionItemNode":
      return ` ${indent(level)} <AccordionItem  value={${
        props.value
      }}> \n${children}\n ${indent(level)} </AccordionItem>`
    case "AccordionTrigger":
      return ` ${indent(level)} <AccordionTrigger> \n${children}\n ${indent(
        level
      )} </AccordionTrigger>`
    case "AccordionContent":
      return ` ${indent(level)} <AccordionContent> \n${children}\n ${indent(
        level
      )} </AccordionContent>`
    default:
      return ""
  }
}

const generateImportStatements = (imports) => {
  const importStatements = `
  "use client";
  import { 
    ${Array.from(imports).join(", \n  ")}
  } from 'dubsui';`
  return importStatements
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
  const [importStatements, setImportStatements] = React.useState(null)
  const [highlightedCode, setHighlightedCode] = React.useState("")
  const [copyCode, setCopyCode] = React.useState("")
  hljs.registerLanguage("html", HTML)
  hljs.registerLanguage("javascript", javascript)

  const highlightCode = (code, importStatements) => {
    const highlightedCodeHJ = hljs.highlight(code, {
      language: "html",
    }).value

    const highlightedImports = hljs.highlight(importStatements + fnString1, {
      language: "javascript",
    }).value

    const highlightedEnd = hljs.highlight(fnString2, {
      language: "javascript",
    }).value

    setCopyCode(importStatements + fnString1 + code + fnString2)
    setHighlightedCode(highlightedImports + highlightedCodeHJ + highlightedEnd)
    //   await codeToHtml(code, {
    //     lang: "javascript",
    //     theme: "vitesse-dark",
    //   }).then((html) => {
    //     setHighlightedCode(html)
    //   })
  }
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
  React.useEffect(() => {
    if (code) {
      highlightCode(code, importStatements)
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
                    const data = query.getSerializedNodes()
                    const imports = new Set()
                    const CodeString = generateJSX(data.ROOT, data, 0, imports)
                    const importStatements = generateImportStatements(imports)
                    console.log(data)

                    setImportStatements(importStatements)
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
                  {highlightedCode && (
                    // <div
                    //   className="overflow-x-auto rounded-md  p-4 font-mono text-xs text-white"
                    //   dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    // />
                    <pre className="relative overflow-x-auto bg-muted rounded-md  p-4 font-mono text-xs text-white">
                      <div className="absolute top-1 right-1">
                        <span
                          onClick={() => copyToClipboard(copyCode)}
                          className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-background p-2 font-mono text-foreground"
                        >
                          {hasCopied ? (
                            <CheckIcon className=" h-4 w-4" />
                          ) : (
                            <ClipboardIcon className=" h-4 w-4" />
                          )}
                        </span>
                      </div>
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                      ></code>
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
