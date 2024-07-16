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
import { ChevronDown, WandSparkles, X } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"

import {
  BackgroundColors,
  BorderColors,
  Presets,
  PrimaryColors,
  SecondaryColors,
  presetMapping,
} from "@/config/colors"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Theme, darkTheme, lightTheme, useTheme } from "./context/theme-context"
import IComponent from "./i-component"
import SaveTheme from "./save-theme"
import { useToast } from "./ui/use-toast"

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
  console.log("light: ", theme, "dark:", DarkTheme)
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

  const [open, setOpen] = useState(false)
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

  const [currentPreset, setCurrentPreset] = useState(
    Object.values(presetMapping)[0]
  )

  const { toast } = useToast()
  const handlePresetChange = (preset: string) => {
    toast({
      description: preset,
      className: "h-[50px]  bg-primary text-primary-foreground",
    })
    setCurrentPreset(preset)
    const light = Presets[preset].light
    const dark = Presets[preset].dark
    localStorage.setItem("customLightTheme", JSON.stringify(light))
    localStorage.setItem("customDarkTheme", JSON.stringify(dark))
    localStorage.setItem("currentPreset", preset)
    setTheme(resolvedTheme === "light" ? (light as Theme) : (dark as Theme))
  }
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isModifierActive =
        event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
      const isKeyboardInputActive =
        document.activeElement?.closest(keyboardInputElement)
      const isNumberKey = !isModifierActive && /^[0-9]$/.test(event.key)
      const isCKey = !isModifierActive && event.key.toLowerCase() === "c"

      if (isNumberKey && !isKeyboardInputActive) {
        const presetIndex = parseInt(event.key, 10)
        const presetKey = presetMapping[presetIndex]

        handlePresetChange(presetKey)
      }

      if (isCKey && !isKeyboardInputActive) {
        const currentPresetIndex =
          Object.values(presetMapping).indexOf(currentPreset)
        const nextPresetIndex =
          (currentPresetIndex + 1) % Object.values(presetMapping).length
        const nextPresetKey = Object.values(presetMapping)[nextPresetIndex]

        handlePresetChange(nextPresetKey)
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [handlePresetChange, keyboardInputElement, currentPreset])

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 cursor-pointer rounded-md border border-primary bg-background p-2 transition-all delay-100 duration-500 ${
          open ? "scale-0" : "scale-100"
        }`}
      >
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <WandSparkles
                onClick={() => setOpen(!open)}
                className="h-6 w-6 text-primary"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme Customizer</p>
            </TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
      </div>
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
        className="fixed bottom-[10px] right-[10px] z-50   rounded-xl border-2 bg-background  text-foreground shadow-lg "
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
        <ScrollArea
          type="scroll"
          className="z-10 h-[90vh]  w-full px-2 md:w-[375px] "
        >
          <div className="ml-2 mt-4">
            <h1 className="text-2xl font-bold text-foreground">Theme</h1>
            <div className="mt-3 gap-4 ">
              <h2 className=" text-foreground">
                Presets{" "}
                <IComponent
                  content={
                    <span>
                      Press 0, 1 , 2 , 3 .. 9 to quickly access the presets.{" "}
                      <br /> Or just press &quot;C&quot; to cycle through the
                      presets.
                      <br /> See if you can guess what each preset is
                      referencing!
                    </span>
                  }
                />
              </h2>
              <section className="ml-2">
                {" "}
                <div className="my-2 flex items-center gap-2 text-xs">
                  {Object.keys(Presets).map((key) => (
                    <label
                      key={key}
                      className=" relative h-6 w-6 rounded-full"
                      style={{ backgroundColor: `${Presets[key].identifier}` }}
                    >
                      <TooltipProvider key={key}>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <input
                              className="themeCustomizer-Input themeCustomizer-Input-Background"
                              type="radio"
                              name="backgroundColor"
                              value={`${Presets[key].identifier}`}
                              checked={currentPreset == key}
                              onChange={() => handlePresetChange(`${key}`)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{key}</p>
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>
                    </label>
                  ))}
                </div>
              </section>
            </div>
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
              <h1 className="text-foreground">
                Mode{" "}
                <IComponent
                  content={
                    <span>
                      Press &quot;D&quot; to quickly switch between Light and
                      Dark Theme.
                    </span>
                  }
                />
              </h1>
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
    </>
  )
}

export default ThemeCustomizer
