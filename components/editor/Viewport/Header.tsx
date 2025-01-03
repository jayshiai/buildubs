import Checkmark from "@/public/icons/check.svg"
import Customize from "@/public/icons/customize.svg"
import RedoSvg from "@/public/icons/toolbox/redo.svg"
import UndoSvg from "@/public/icons/toolbox/undo.svg"
import { useEditor } from "@craftjs/core"

import "highlight.js/styles/atom-one-dark.css"
import React, { useState } from "react"

import {
  generateImportStatements,
  generateJSX,
} from "@/lib/editorUtils/generator"
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

import { ClipboardButton } from "../components/clipboard-button"
import DeployButton from "../components/deploy-button"
import { useHighlightCode } from "../components/use-highlight"

export const Header = () => {
  const { enabled, query, canUndo, canRedo, actions } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  )

  const [code, setCode] = useState(null)
  const [importStatements, setImportStatements] = useState(null)
  const { highlightedCode, copyCode } = useHighlightCode(code, importStatements)
  const [hasCopied, setHasCopied] = useState(false)

  const handleCodeGeneration = () => {
    const data = query.getSerializedNodes()
    const imports = new Set()
    const CodeString = generateJSX(data.ROOT, data, 0, imports)
    const importStatements = generateImportStatements(imports)
    setImportStatements(importStatements)
    setCode(CodeString)
  }

  const handleUndoRedo = (action) => {
    if (action === "undo" && canUndo) actions.history.undo()
    if (action === "redo" && canRedo) actions.history.redo()
  }

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
                    onClick={() => handleUndoRedo("undo")}
                  >
                    <UndoSvg className="h-5 w-5 fill-current text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={4} side="bottom">
                  Undo
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`mr-2 cursor-pointer ${
                      !canRedo ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => handleUndoRedo("redo")}
                  >
                    <RedoSvg className="h-5 w-5 fill-current text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={4} side="bottom">
                  Redo
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="ml-2" onClick={handleCodeGeneration}>
                Code
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Generated Code</SheetTitle>
                <SheetDescription>
                  This <strong>JSX</strong> code is generated from the current
                  state of the editor.
                  <br /> Paste it in your React project to render the same UI.
                  <br /> Be sure to have the <strong>DubsUI</strong> library
                  installed in your project.
                </SheetDescription>
              </SheetHeader>
              <div>
                {highlightedCode && (
                  <pre className="relative overflow-x-auto bg-muted rounded-md p-4 font-mono text-xs text-white">
                    <div className="absolute top-1 right-1">
                      <ClipboardButton
                        copyCode={copyCode}
                        hasCopied={hasCopied}
                        onCopy={() => setHasCopied(true)}
                      />
                    </div>
                    <code
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  </pre>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <div
            className={cn(
              `flex cursor-pointer items-center rounded px-4 py-1 text-sm transition ${
                enabled
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-foreground text-background"
              }`
            )}
            onClick={() =>
              actions.setOptions((options) => (options.enabled = !enabled))
            }
          >
            {enabled ? (
              <Checkmark className="mr-1 h-3 w-3 fill-secondary-foreground" />
            ) : (
              <Customize className="mr-1 h-3 w-3 fill-background" />
            )}
            {enabled ? "Finish Editing" : "Edit"}
          </div>

          <div>
            <DeployButton />
          </div>
        </div>
      </div>
    </div>
  )
}
