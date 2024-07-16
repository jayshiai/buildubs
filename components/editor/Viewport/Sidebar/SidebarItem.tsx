import React from "react"

import Arrow from "../../../../public/icons/arrow.svg"

export type SidebarItemProps = {
  title: string
  height?: string
  icon: string
  visible?: boolean
  onChange?: (bool: boolean) => void
  children?: React.ReactNode
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
}) => {
  return (
    <div
      className={`flex flex-col  ${
        visible && height && height === "full" ? "flex-1" : "unset"
      } text-primary`}
      style={{
        height: visible && height && height !== "full" ? height : "auto",
      }}
    >
      <div
        onClick={() => {
          if (onChange) onChange(!visible)
        }}
        className={`flex cursor-pointer items-center border-b bg-card px-2 last:border-b-0 ${
          visible ? "shadow-sm" : ""
        } h-11 text-primary`}
      >
        <div className="flex flex-1 items-center">
          {React.createElement(icon, { className: "w-4 h-4 mr-2" })}
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <a className={`${visible ? "rotate-180" : "rotate-0"}`}>
          <Arrow className="h-2 w-2" />
        </a>
      </div>
      {visible ? (
        <div className="w-full flex-1 overflow-auto">{children}</div>
      ) : null}
    </div>
  )
}
