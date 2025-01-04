"use client"

import { useEffect, useState } from "react"
import { Editor, Frame } from "@craftjs/core"
import LZUTF8 from "lzutf8"

import { getSiteData } from "@/lib/editorUtils/fetch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
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

export default function SiteHomePage() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the domain from the URL's hostname
        const domain = window.location.hostname.split(".")[0] // Extract 'iitn' from 'iitn.localhost'

        console.log("DOMAIN: ", domain)

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
      <div className="h-screen w-screen flex justify-center items-center text-3xl">
        <Icons.logo className=" animate-spin h-10 w-10" />
      </div>
    ) // Show loading spinner or placeholder
  }

  if (error) {
    return <div>{error}</div> // Show error message if there was an issue
  }

  return (
    <div className="h-full flex justify-center">
      <div className="fixed top-2 left-2 z-[100] bg-background rounded-md p-4">
        <a href="https://ui.3dubs.in/" className="items-center  space-x-2 flex">
          <Icons.logo />
          <span className="font-bold inline-block">
            <span className="ave">3DUBS</span> / dubsui
          </span>
        </a>
      </div>
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
      >
        <Frame json={data}></Frame>
      </Editor>
    </div>
  )
}
