import { Breadcrumb } from "dubsui"

export default function BreadcrumbDemo() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    {
      label: "Components",
      items: [
        { href: "/docs/components", label: "Components" },
        { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
        { href: "/docs/components/button", label: "Button" },
        {
          href: "/docs/components/dropdown-menu",
          label: "Dropdown Menu",

          items: [
            { href: "/docs/components/alert-dialog", label: "Alert Dialog" },
            { href: "/docs/components/tooltip", label: "Tooltip" },
            { href: "/docs/components/popover", label: "Popover" },
          ],
        },
      ],
    },
    { label: "Breadcrumb" },
  ]

  return <Breadcrumb items={breadcrumbItems} />
}
