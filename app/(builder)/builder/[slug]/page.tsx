"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Editor, Element, Frame } from "@craftjs/core"
import LZUTF8 from "lzutf8"

import { getSiteData } from "@/lib/editorUtils/fetch"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { RenderNode, Viewport } from "@/components/editor"
import { Container, Text } from "@/components/editor/selectors"
import AccordionNode, {
  AccordionItemNode,
  AccordionItems,
} from "@/components/editor/selectors/Accordion"
import AlertDialogNode from "@/components/editor/selectors/AlertDialog"
import AvatarNode from "@/components/editor/selectors/Avatar"
import { ButtonNode } from "@/components/editor/selectors/Button"
import SeparatorNode from "@/components/editor/selectors/Separator"
import { Icons } from "@/components/icons"

function App() {
  const params = useParams()
  const domain = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getSiteData(domain)
        if (!fetchedData) {
          setError("Site data not found.")
          return
        }

        const decompressedData = LZUTF8.decompress(fetchedData, {
          inputEncoding: "Base64",
        })
        const parsedData = JSON.parse(decompressedData)

        // console.log("Parsed data:", parsedData)
        setData(parsedData)
      } catch (error) {
        console.error("Error fetching or decompressing data:", error)
        setError("An error occurred while loading the site.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="h-[calc(100vh-40px)] w-full flex justify-center items-center text-3xl">
        <Icons.logo className=" animate-spin h-10 w-10" />
      </div>
    ) // Show loading spinner or placeholder
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-40px)] w-full flex  flex-col gap-4 justify-center items-center">
        <p> {error}</p>
      </div>
    ) // Show error message if there was an issue
  }

  return (
    <div className="h-full ">
      <Editor
        resolver={{
          Container,
          Text,

          ButtonNode,

          Button,
          AlertDialogNode,
          AccordionNode,
          AccordionItem,
          AccordionTrigger,
          AccordionContent,
          AccordionItems,
          AccordionItemNode,
          AvatarNode,
          SeparatorNode,
        }}
        enabled={false}
        onRender={RenderNode}
      >
        <Viewport>
          <div
            id="craftjs-renderer"
            className="relative flex h-full w-full justify-center"
          >
            <Frame json={data}></Frame>
          </div>
        </Viewport>
      </Editor>
    </div>
  )
}

export default App
