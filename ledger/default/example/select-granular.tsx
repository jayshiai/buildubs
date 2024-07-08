import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "dubsui"

export default function SelectGranular() {
  return (
    <SelectRoot>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          <SelectItem value="light">Light</SelectItem>

          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Colors</SelectLabel>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="green">Green</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  )
}
