import { Select, SelectItemType } from "dubsui"

export default function SelectDemo() {
  const items: SelectItemType[] = [
    {
      label: "Fruits",
      items: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "blueberry", label: "Blueberry" },
        { value: "grapes", label: "Grapes" },
        { value: "pineapple", label: "Pineapple" },
      ],
    },
    {
      label: "Vegetables",
      items: [
        { value: "aubergine", label: "Aubergine" },
        { value: "broccoli", label: "Broccoli" },
        { value: "carrot", label: "Carrot", disabled: true },
        { value: "courgette", label: "Courgette" },
        { value: "leek", label: "Leek" },
      ],
    },
    {
      label: "Meat",
      items: [
        { value: "beef", label: "Beef" },
        { value: "chicken", label: "Chicken" },
        { value: "lamb", label: "Lamb" },
        { value: "pork", label: "Pork" },
      ],
    },
  ]

  return (
    <Select className="w-[150px]" items={items} placeholder="Placeholder" />
  )
}
