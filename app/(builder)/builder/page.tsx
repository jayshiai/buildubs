"use client"

import React from "react"
import { Editor, Element, Frame } from "@craftjs/core"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
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

function App() {
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
            <Frame>
              <Element
                canvas
                is={Container}
                width="800px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["40", "40", "40", "40"]}
                custom={{ displayName: "App" }}
              >
                <Element
                  canvas
                  is={Container}
                  flexDirection="row"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["0", "0", "40", "0"]}
                  custom={{ displayName: "Introduction" }}
                >
                  <Element
                    canvas
                    is={Container}
                    width="40%"
                    height="100%"
                    padding={["0", "20", "0", "20"]}
                    custom={{ displayName: "Heading" }}
                  >
                    <Text
                      fontSize="40"
                      fontWeight="800"
                      textAlign="center"
                      text="DubsUI "
                    ></Text>
                    <Text
                      fontSize="20"
                      fontWeight="400"
                      textAlign="center"
                      text="by 3Dubs and DevsTomorrow"
                    ></Text>
                  </Element>

                  <Element
                    canvas
                    is={Container}
                    width="60%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding={["0", "20", "0", "20"]}
                    custom={{ displayName: "Description" }}
                  >
                    <Text
                      fontSize="25"
                      fontWeight="500"
                      text="A Minimalistic Component Library"
                    ></Text>
                    <Text
                      fontSize="14"
                      fontWeight="400"
                      text="Built for React on top of RadixUI."
                    ></Text>
                  </Element>
                </Element>
                <SeparatorNode></SeparatorNode>
                <Element
                  canvas
                  is={Container}
                  background={{ r: 39, g: 41, b: 41, a: 1 }}
                  flexDirection="column"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["40", "0", "40", "0"]}
                  custom={{ displayName: "ComplexSection" }}
                >
                  <Element
                    canvas
                    background={{
                      r: 76,
                      g: 78,
                      b: 78,
                      a: 0,
                    }}
                    is={Container}
                    flexDirection="row"
                    margin={["0", "0", "0", "0"]}
                    width="100%"
                    height="auto"
                    alignItems="center"
                    custom={{ displayName: "Wrapper" }}
                  >
                    <Element
                      canvas
                      background={{
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0,
                      }}
                      is={Container}
                      alignItems="center"
                      padding={["0", "0", "0", "0"]}
                      flexDirection="row"
                      width="350px"
                      height="250px"
                      custom={{ displayName: "Square" }}
                    >
                      <Element
                        canvas
                        is={Container}
                        justifyContent="center"
                        alignItems="center"
                        background={{
                          r: 76,
                          g: 78,
                          b: 78,
                          a: 1,
                        }}
                        shadow={25}
                        width="90%"
                        height="90%"
                        padding={["10", "20", "10", "20"]}
                        custom={{ displayName: "Outer" }}
                      >
                        <Element
                          canvas
                          is={Container}
                          justifyContent="center"
                          alignItems="center"
                          background={{
                            r: 76,
                            g: 78,
                            b: 78,
                            a: 1,
                          }}
                          shadow={50}
                          width="80%"
                          height="80%"
                          padding={["10", "20", "10", "20"]}
                          custom={{ displayName: "Middle" }}
                        >
                          <Element
                            canvas
                            is={Container}
                            justifyContent="center"
                            alignItems="center"
                            background={{
                              r: 76,
                              g: 78,
                              b: 78,
                              a: 1,
                            }}
                            shadow={50}
                            width="60%"
                            height="60%"
                            padding={["10", "20", "10", "20"]}
                            custom={{ displayName: "Inner" }}
                          />
                        </Element>
                      </Element>
                    </Element>

                    <Element
                      canvas
                      background={{
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0,
                      }}
                      is={Container}
                      padding={["0", "0", "0", "20"]}
                      flexDirection="column"
                      justifyContent="center"
                      width="55%"
                      height="100%"
                      fillSpace="yes"
                      custom={{ displayName: "Content" }}
                    >
                      <Text
                        color={{
                          r: "255",
                          g: "255",
                          b: "255",
                          a: "1",
                        }}
                        margin={["0", "0", "18", "0"]}
                        fontSize="20"
                        text="Design complex components with ease"
                      ></Text>
                      <Text
                        color={{
                          r: "255",
                          g: "255",
                          b: "255",
                          a: "0.8",
                        }}
                        fontSize="14"
                        fontWeight="400"
                        text="Just drag and drop components to create complex layouts. Its that simple."
                      ></Text>
                    </Element>
                  </Element>
                </Element>
                <SeparatorNode></SeparatorNode>
                <Element
                  canvas
                  is={Container}
                  background={{
                    r: 234,
                    g: 245,
                    b: 245,
                    a: 1,
                  }}
                  flexDirection="column"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["0", "0", "40", "0"]}
                  custom={{ displayName: "Programmatic" }}
                >
                  <Element
                    canvas
                    background={{
                      r: 76,
                      g: 78,
                      b: 78,
                      a: 0,
                    }}
                    is={Container}
                    flexDirection="column"
                    margin={["0,", "0", "20", "0"]}
                    width="100%"
                    height="auto"
                    custom={{ displayName: "Heading" }}
                  >
                    <Text
                      color={{
                        r: "46",
                        g: "47",
                        b: "47",
                        a: "1",
                      }}
                      fontSize="23"
                      text="Programmatic drag &amp; drop"
                    ></Text>
                    <Text
                      fontSize="14"
                      fontWeight="400"
                      text="Govern what goes in and out of your components"
                    ></Text>
                  </Element>
                  <Element
                    canvas
                    background={{
                      r: 76,
                      g: 78,
                      b: 78,
                      a: 0,
                    }}
                    is={Container}
                    flexDirection="row"
                    margin={["30", "0", "0", "0"]}
                    width="100%"
                    height="auto"
                    custom={{ displayName: "Content" }}
                  >
                    <AlertDialogNode></AlertDialogNode>
                    <Container
                      background={{
                        r: 76,
                        g: 78,
                        b: 78,
                        a: 0,
                      }}
                      width="100px"
                      margin={["0", "0", "0", "20"]}
                    >
                      <ButtonNode text="Primary"></ButtonNode>
                    </Container>
                    <Container
                      background={{
                        r: 76,
                        g: 78,
                        b: 78,
                        a: 0,
                      }}
                      width="100px"
                      margin={["0", "0", "0", "20"]}
                    >
                      <ButtonNode
                        text="Delete"
                        buttonStyle="destructive"
                        color={{ r: 255, g: 255, b: 255, a: 1 }}
                      ></ButtonNode>
                    </Container>
                  </Element>
                </Element>
                <SeparatorNode></SeparatorNode>
                <Element
                  canvas
                  is={Container}
                  flexDirection="row"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["0", "0", "40", "0"]}
                  custom={{ displayName: "Introduction" }}
                >
                  <Element
                    canvas
                    is={Container}
                    width="40%"
                    height="100%"
                    padding={["0", "20", "0", "20"]}
                    alignItems="center"
                    justifyContent="center"
                    custom={{ displayName: "Heading" }}
                  >
                    <AvatarNode></AvatarNode>
                    <Text textAlign="center" text="@jayshiai" />
                  </Element>

                  <Element
                    canvas
                    is={Container}
                    width="60%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding={["0", "20", "0", "20"]}
                    custom={{ displayName: "Description" }}
                  >
                    <AccordionNode />
                  </Element>
                </Element>
              </Element>
            </Frame>
          </div>
        </Viewport>
      </Editor>
    </div>
  )
}

export default App
