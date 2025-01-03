import { useEffect, useState } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import HTML from "highlight.js/lib/languages/xml"

hljs.registerLanguage("html", HTML)
hljs.registerLanguage("javascript", javascript)

const fnString1 = `
const MyComponent = () => {
  return (
  
  `
const fnString2 = ` )
}

export default MyComponent
`
export const useHighlightCode = (code, importStatements) => {
  const [highlightedCode, setHighlightedCode] = useState("")
  const [copyCode, setCopyCode] = useState("")

  useEffect(() => {
    if (code) {
      const highlightedCodeHJ = hljs.highlight(code, { language: "html" }).value
      const highlightedImports = hljs.highlight(importStatements + fnString1, {
        language: "javascript",
      }).value
      const highlightedEnd = hljs.highlight(fnString2, {
        language: "javascript",
      }).value

      setCopyCode(importStatements + fnString1 + code + fnString2)
      setHighlightedCode(
        highlightedImports + highlightedCodeHJ + highlightedEnd
      )
    }
  }, [code, importStatements])

  return { highlightedCode, copyCode }
}
