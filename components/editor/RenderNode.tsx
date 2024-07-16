"use client"

import React, { useCallback, useEffect, useRef } from "react"
import ArrowUp from "@/public/icons/arrow-up.svg"
import Delete from "@/public/icons/delete.svg"
import Move from "@/public/icons/move.svg"
import { useEditor, useNode } from "@craftjs/core"
import { ROOT_NODE } from "@craftjs/utils"
import ReactDOM from "react-dom"

export const RenderNode = ({ render }) => {
  const { id } = useNode()
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }))

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }))

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add("component-selected")
        dom.style.border = "1px solid blue"
      } else {
        dom.classList.remove("component-selected")
        dom.style.border = "0px"
      }
    }
  }, [dom, isActive, isHover])

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 }
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    }
  }, [])

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef

    if (!currentDOM) return
    const { top, left } = getPos(dom)
    currentDOM.style.top = top
    currentDOM.style.left = left
  }, [dom, getPos])

  useEffect(() => {
    const renderer = document.querySelector(".craftjs-renderer")
    if (renderer) {
      renderer.addEventListener("scroll", scroll)
    }

    return () => {
      if (renderer) {
        renderer.removeEventListener("scroll", scroll)
      }
    }
  }, [scroll])

  return (
    <>
      {(isHover || isActive) &&
        ReactDOM.createPortal(
          <div
            ref={currentRef}
            className="fixed flex items-center bg-blue-500 p-2 text-white"
            style={{
              left: getPos(dom).left,
              top: getPos(dom).top,
              zIndex: 9999,
              height: "30px",
              marginTop: "-29px",
              fontSize: "12px",
              lineHeight: "12px",
            }}
          >
            <h2 className="mr-4 flex-1">{name}</h2>
            {moveable && (
              <div className="mr-2 cursor-move" ref={drag}>
                <Move className="h-3.5 w-3.5 fill-current text-white" />
              </div>
            )}
            {id !== ROOT_NODE && (
              <div
                className="mr-2 cursor-pointer"
                onClick={() => {
                  actions.selectNode(parent)
                }}
              >
                <ArrowUp className="h-3.5 w-3.5 fill-current text-white" />
              </div>
            )}
            {deletable && (
              <div
                className="cursor-pointer"
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  actions.delete(id)
                }}
              >
                <Delete className="h-3.5 w-3.5 fill-current text-white" />
              </div>
            )}
          </div>,
          document.querySelector(".page-container")
        )}
      {render}
    </>
  )
}
