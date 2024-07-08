"use client"

import React, { useEffect, useState } from "react"
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Button,
  TooltipProvider as OriginalTooltipProvider,
  ScrollArea,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "dubsui"
import { ChevronDown, X } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"
import { Theme } from "shiki"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { darkTheme, lightTheme, useTheme } from "./context/theme-context"
import SaveTheme from "./save-theme"
import { Label } from "./ui/label"

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

const TooltipProvider = ({ children }) => {
  return (
    <OriginalTooltipProvider delayDuration={100}>
      {children}
    </OriginalTooltipProvider>
  )
}
const generateCssVariables = () => {
  let themeStore = localStorage.getItem("customLightTheme")
  let theme = themeStore ? JSON.parse(themeStore) : lightTheme

  let darkThemeStore = localStorage.getItem("customDarkTheme")
  let DarkTheme = darkThemeStore ? JSON.parse(darkThemeStore) : darkTheme
  return `
  :root {
    --background: ${theme.background};
    --foreground: ${theme.foreground};

    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};

    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};

    --border: ${theme.border};
    --input: ${theme.input};

    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};

    --primary: ${theme.primary};
    --primary-foreground: ${theme.primaryForeground};

    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};

    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};

    --destructive: ${theme.destructive};
    --destructive-foreground: ${theme.destructiveForeground};

    --ring: ${theme.ring};

    --radius: ${theme.radius};
  }

  .dark {
    --background: ${DarkTheme.background};
    --foreground: ${DarkTheme.foreground};

    --muted: ${DarkTheme.muted};
    --muted-foreground: ${DarkTheme.mutedForeground};

    --accent: ${DarkTheme.accent};
    --accent-foreground: ${DarkTheme.accentForeground};

    --popover: ${DarkTheme.popover};
    --popover-foreground: ${DarkTheme.popoverForeground};

    --border: ${DarkTheme.border};
    --input: ${DarkTheme.input};

    --card: ${DarkTheme.card};
    --card-foreground: ${DarkTheme.cardForeground};

    --primary: ${DarkTheme.primary};
    --primary-foreground: ${DarkTheme.primaryForeground};

    --secondary: ${DarkTheme.secondary};
    --secondary-foreground: ${DarkTheme.secondaryForeground};

    --destructive: ${DarkTheme.destructive};
    --destructive-foreground: ${DarkTheme.destructiveForeground};

    --ring: ${DarkTheme.ring};

    --radius: ${DarkTheme.radius};
  }
  `
}
const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, setTheme } = useTheme()
  const {
    theme: nextTheme,
    resolvedTheme,
    setTheme: setNextTheme,
  } = useNextTheme()
  const handleResetTheme = () => {
    if (localStorage) {
      if (nextTheme === "light") {
        localStorage.removeItem("customLightTheme")
      } else {
        localStorage.removeItem("customDarkTheme")
      }
      // Optionally, you can set a default theme state here if needed
      setTheme(nextTheme === "light" ? lightTheme : darkTheme)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "radius") {
      updateTheme(name as keyof typeof theme, `${value}rem`)
    } else {
      updateTheme(name as keyof typeof theme, value)
    }
  }

  const keyboardInputElement = `
  [contenteditable],
  [role="combobox"],
  [role="listbox"],
  [role="menu"],
  input:not([type="radio"], [type="checkbox"]),
  select,
  textarea
`

  const [open, setOpen] = useState(true)
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isModifierActive =
        event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
      const isKeyboardInputActive =
        document.activeElement?.closest(keyboardInputElement)
      const isKeyT = event.key?.toUpperCase() === "T" && !isModifierActive
      if (isKeyT && !isKeyboardInputActive) {
        setOpen(!open)
      }
    }

    console.log(generateCssVariables())
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [setOpen, open, keyboardInputElement])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isModifierActive =
        event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
      const isKeyboardInputActive =
        document.activeElement?.closest(keyboardInputElement)
      const isKeyD = event.key?.toUpperCase() === "D" && !isModifierActive
      if (isKeyD && !isKeyboardInputActive) {
        setNextTheme(resolvedTheme === "light" ? "dark" : "light")
      }
    }
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [setNextTheme, resolvedTheme, keyboardInputElement])

  const handleColorChange = (color: string, Colors) => {
    Colors.fields.forEach((field) => {
      updateTheme(field as keyof typeof theme, color)
    })
    console.log("Color:", color, "Theme:", theme.background)
  }

  const PrimaryColors = {
    fields: [
      "primary",
      "cardForeground",
      "secondaryForeground",
      "accentForeground",
      "foreground",
      "mutedForeground",
      "popoverForeground",
    ],
    values: [
      { name: "Default Dark", value: "#f8fafc" },
      { name: "Default Light", value: "#0f172a" },
      { name: "Teal", value: "#007f80" },
      { name: "Red", value: "#FF0000" },
      { name: "Green", value: "#00FF00" },
      { name: "Blue", value: "#0000FF" },
      { name: "Yellow", value: "#FFFF00" },
      { name: "Cyan", value: "#00FFFF" },
      { name: "Magenta", value: "#FF00FF" },
    ],
  }

  const SecondaryColors = {
    fields: ["secondary", "muted", "accent"],
    values: [
      { name: "Default Dark", value: "#0f172a" },
      { name: "Default Light", value: "#f1f5f9" },
      { name: "Sky", value: "#7CE2FE" },
      { name: "Amber", value: "#FFE7B3" },
      { name: "Dull Teal", value: "#0D2D2A" },
      { name: "Dull Iris", value: "#202248" },
    ],
  }

  const BackgroundColors = {
    fields: ["background", "popover", "card", "primaryForeground"],
    values: [
      { name: "Default Dark", value: "#030711" },
      { name: "Default Light", value: "#ffffff" },

      { name: "Gold", value: "#ffd900" },
      { name: "Lavender", value: "#E6E6FA" },
      { name: "Indigo", value: "#4B0082" },
      { name: "Salmon", value: "#FA8072" },
      { name: "Beige", value: "#F5F5DC" },
      { name: "Wheat", value: "#F5DEB3" },
      { name: "Ivory", value: "#FFFFF0" },
    ],
  }
  const BorderColors = {
    fields: ["border", "ring", "input"],
    values: [
      { name: "Default Dark", value: "#1d283a" },
      { name: "Default Light", value: "#e2e8f0" },
      { name: "Purple", value: "#8E4EC6" },
      { name: "Ruby", value: "#E54666" },
      { name: "Jade", value: "#1FD8A4" },
    ],
  }
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: "calc(100vh - var(--space-4) - var(--space-4))",
        transformOrigin: "top center",
        transitionProperty: "transform, box-shadow",
        transitionDuration: "200ms",
        transitionTimingFunction: open ? "ease-out" : "ease-in",
        transform: open ? "none" : "translateX(105%)",
        boxShadow: open ? "var(--shadow-5)" : "var(--shadow-2)",
      }}
      className="fixed bottom-[10px] right-[10px] hidden  rounded-xl border-2 bg-background  text-foreground shadow-lg md:block"
    >
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <div
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-50 cursor-pointer"
            >
              <X />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Press &quot;T&quot; to open and close the Theme Customizer</p>
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
      <ScrollArea type="scroll" className="z-10 h-[90vh] w-[375px] px-2 ">
        <div className="ml-2 mt-4">
          <h1 className="text-2xl font-bold text-foreground">Theme</h1>
          <div className="mt-3 gap-4 ">
            <h2 className=" text-foreground">Background</h2>
            <section className="ml-2">
              {" "}
              <div className="my-2 flex items-center gap-2 text-xs">
                {BackgroundColors.values.map((color) => (
                  <label
                    key={color.name}
                    className=" relative h-6 w-6 rounded-full"
                    style={{ backgroundColor: `${color.value}` }}
                  >
                    <TooltipProvider key={color.name}>
                      <TooltipRoot>
                        <TooltipTrigger asChild>
                          <input
                            className="themeCustomizer-Input themeCustomizer-Input-Background"
                            type="radio"
                            name="backgroundColor"
                            value={color.value}
                            checked={theme.background == color.value}
                            onChange={() =>
                              handleColorChange(color.value, BackgroundColors)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color.name}</p>
                        </TooltipContent>
                      </TooltipRoot>
                    </TooltipProvider>
                  </label>
                ))}
              </div>
              <div className="my-2 flex items-center gap-2 text-xs">
                <h4>Custom:</h4>
                <input
                  type="color"
                  name="background"
                  value={theme.background}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleColorChange(e.target.value, BackgroundColors)
                  }}
                  className="h-4 w-4"
                />
              </div>
            </section>
          </div>
          <div className="mt-3 gap-4 ">
            <h2 className=" text-foreground">Primary</h2>
            <section className="ml-2">
              {" "}
              <div className="my-2 flex items-center gap-2 text-xs">
                {PrimaryColors.values.map((color) => (
                  <label
                    key={color.name}
                    className=" relative h-6 w-6 rounded-full"
                    style={{ backgroundColor: `${color.value}` }}
                  >
                    <TooltipProvider key={color.name}>
                      <TooltipRoot>
                        <TooltipTrigger asChild>
                          <input
                            className="themeCustomizer-Input themeCustomizer-Input-Primary"
                            type="radio"
                            name="accentColor"
                            value={color.value}
                            checked={theme.primary == color.value}
                            onChange={() =>
                              handleColorChange(color.value, PrimaryColors)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color.name}</p>
                        </TooltipContent>
                      </TooltipRoot>
                    </TooltipProvider>
                  </label>
                ))}
              </div>
              <div className="my-2 flex items-center gap-2 text-xs">
                <h4>Custom:</h4>
                <input
                  type="color"
                  name="primary"
                  value={theme.primary}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleColorChange(e.target.value, PrimaryColors)
                  }}
                  className="h-4 w-4 "
                />
              </div>
            </section>
          </div>
          <div className="mt-3 gap-4 ">
            <h2 className=" text-foreground">Secondary</h2>
            <section className="ml-2">
              {" "}
              <div className="my-2 flex items-center gap-2 text-xs">
                {SecondaryColors.values.map((color) => (
                  <label
                    key={color.name}
                    className=" relative h-6 w-6 rounded-full"
                    style={{ backgroundColor: `${color.value}` }}
                  >
                    <TooltipProvider key={color.name}>
                      <TooltipRoot>
                        <TooltipTrigger asChild>
                          <input
                            className="themeCustomizer-Input themeCustomizer-Input-Secondary"
                            type="radio"
                            name="secondaryColor"
                            value={color.value}
                            checked={theme.secondary == color.value}
                            onChange={() =>
                              handleColorChange(color.value, SecondaryColors)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color.name}</p>
                        </TooltipContent>
                      </TooltipRoot>
                    </TooltipProvider>
                  </label>
                ))}
              </div>
              <div className="my-2 flex items-center gap-2 text-xs">
                <h4>Custom:</h4>
                <input
                  type="color"
                  name="background"
                  value={theme.secondary}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleColorChange(e.target.value, SecondaryColors)
                  }}
                  className="h-4 w-4"
                />
              </div>
            </section>
          </div>

          <div className="mt-3 gap-4 ">
            <h2 className=" text-foreground">Border</h2>
            <section className="ml-2">
              {" "}
              <div className="my-2 flex items-center gap-2 text-xs">
                {BorderColors.values.map((color) => (
                  <label
                    key={color.name}
                    className=" relative h-6 w-6 rounded-full"
                    style={{ backgroundColor: `${color.value}` }}
                  >
                    <TooltipProvider key={color.name}>
                      <TooltipRoot>
                        <TooltipTrigger asChild>
                          <input
                            className="themeCustomizer-Input themeCustomizer-Input-Border"
                            type="radio"
                            name="borderColor"
                            value={color.value}
                            checked={theme.border == color.value}
                            onChange={() =>
                              handleColorChange(color.value, BorderColors)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color.name}</p>
                        </TooltipContent>
                      </TooltipRoot>
                    </TooltipProvider>
                  </label>
                ))}
              </div>
              <div className="my-2 flex items-center gap-2 text-xs">
                <h4>Custom:</h4>
                <input
                  type="color"
                  name="border"
                  value={theme.border}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleColorChange(e.target.value, BorderColors)
                  }}
                  className="h-4 w-4"
                />
              </div>
            </section>
          </div>

          <div>
            <h1 className="text-foreground">Mode</h1>
            <div className="flex w-full gap-4">
              <div className=" relative flex  w-[100px] items-center justify-center rounded-md border py-2">
                <Icons.sun className="mr-2 h-4 w-4" />
                Light
                <input
                  id="light"
                  type="radio"
                  className={cn(
                    "themeCustomizer-Input ",
                    nextTheme == "light" ? " border-2 border-primary" : ""
                  )}
                  onClick={() => setNextTheme("light")}
                />
              </div>
              <div className=" relative flex w-[100px] items-center justify-center rounded-md border py-2">
                <Icons.moon className="mr-2 h-4 w-4" />
                Dark
                <input
                  id="dark"
                  type="radio"
                  className={cn(
                    "themeCustomizer-Input  ",
                    nextTheme == "dark" ? "border-2 border-primary" : ""
                  )}
                  onClick={() => setNextTheme("dark")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <SaveTheme
            onClick={() => copyToClipboard(generateCssVariables())}
            variant={"default"}
            text="Copy Theme"
            clickedText="Copied!"
            className="ml-2 mt-6 w-[115px]"
          />

          <SaveTheme
            onClick={() => handleResetTheme()}
            variant={"outline"}
            text="Reset Theme"
            clickedText="Theme Reset!"
            className="ml-2 mt-6 w-[115px]"
          />
        </div>
        <AccordionRoot type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>
              Advanced Settings
              <ChevronDown className="ml-2 h-5 w-5" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 place-items-center gap-3 gap-y-6 whitespace-break-spaces p-4 text-center text-sm">
                <div className=" ">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Background
                    <input
                      type="color"
                      name="background"
                      value={theme.background}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Foreground
                    <input
                      type="color"
                      name="foreground"
                      value={theme.foreground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Border
                    <input
                      type="color"
                      name="border"
                      value={theme.border}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Primary
                    <input
                      type="color"
                      name="primary"
                      value={theme.primary}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Primary Foreground
                    <input
                      type="color"
                      name="primaryForeground"
                      value={theme.primaryForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Input
                    <input
                      type="color"
                      name="input"
                      value={theme.input}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Secondary
                    <input
                      type="color"
                      name="secondary"
                      value={theme.secondary}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Secondary Foreground
                    <input
                      type="color"
                      name="secondaryForeground"
                      value={theme.secondaryForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div>
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Ring
                    <input
                      type="color"
                      name="ring"
                      value={theme.ring}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Popover
                    <input
                      type="color"
                      name="popover"
                      value={theme.popover}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Popover Foreground
                    <input
                      type="color"
                      name="popoverForeground"
                      value={theme.popoverForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Card
                    <input
                      type="color"
                      name="card"
                      value={theme.card}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>

                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Muted
                    <input
                      type="color"
                      name="muted"
                      value={theme.muted}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Muted Foreground
                    <input
                      type="color"
                      name="mutedForeground"
                      value={theme.mutedForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Card Foreground
                    <input
                      type="color"
                      name="cardForeground"
                      value={theme.cardForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Accent
                    <input
                      type="color"
                      name="accent"
                      value={theme.accent}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Accent Foreground
                    <input
                      type="color"
                      name="accentForeground"
                      value={theme.accentForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>

                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Destructive
                    <input
                      type="color"
                      name="destructive"
                      value={theme.destructive}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>

                <div></div>
                <div className="">
                  <label className="flex w-fit flex-col-reverse items-center text-xs">
                    Destructive Foreground
                    <input
                      type="color"
                      name="destructiveForeground"
                      value={theme.destructiveForeground}
                      onChange={handleInputChange}
                      className=""
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <label className="flex  items-center ">
                  Radius
                  <input
                    type="number"
                    name="radius"
                    step={0.1}
                    min="0"
                    value={parseFloat(theme.radius.replace("rem", ""))}
                    onChange={handleInputChange}
                    className=" bg-white text-black"
                  />
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </ScrollArea>
    </div>
  )
}

export default ThemeCustomizer
