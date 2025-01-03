
const indent = (level) => "  ".repeat(level)
const separatorStyle = (props) => `
  margin: "${props.margin.map((m) => `${m}px`).join(" ")}",
`
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
export const generateJSX = (node, data, level = 0, imports = new Set()) => {
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

  
 export const generateImportStatements = (imports) => {
    const importStatements = `
    "use client";
    import { 
      ${Array.from(imports).join(", \n  ")}
    } from 'dubsui';`
    return importStatements
  }


  