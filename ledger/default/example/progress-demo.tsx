import { useEffect, useState } from "react"
import { Progress } from "dubsui"

export default function ProgressDemo() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 101)
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return <Progress value={progress} className=" w-3/5" />
}
