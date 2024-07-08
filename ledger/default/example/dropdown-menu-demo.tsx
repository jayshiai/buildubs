import { Button, DropdownMenu, DropdownMenuItemType } from "dubsui"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react"

export default function DropdownMenuDemo() {
  const items: DropdownMenuItemType[] = [
    { label: "Home", href: "/", icon: <Cloud className="mr-2 h-4 w-4" /> },
    {
      label: "Products",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      items: [
        {
          label: "Electronics",
          href: "/products/electronics",
          icon: <Github className="mr-2 h-4 w-4" />,
        },
        {
          label: "Clothing",
          href: "/products/clothing",
          icon: <Keyboard className="mr-2 h-4 w-4" />,
        },
        {
          label: "More Categories",
          icon: <LifeBuoy className="mr-2 h-4 w-4" />,
          items: [
            {
              label: "Books",
              href: "/products/books",
              icon: <MessageSquare className="mr-2 h-4 w-4" />,
            },
            {
              label: "Furniture",
              href: "/products/furniture",
              icon: <Mail className="mr-2 h-4 w-4" />,
            },
          ],
        },
      ],
    },
    {
      label: "About Us",
      href: "/about",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Mail className="mr-2 h-4 w-4" />,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      items: [
        {
          label: "Profile",
          href: "/settings/profile",
          icon: <User className="mr-2 h-4 w-4" />,
        },
        {
          label: "Preferences",
          icon: <UserPlus className="mr-2 h-4 w-4" />,
          items: [
            {
              label: "Language",
              href: "/settings/preferences/language",
              icon: <Cloud className="mr-2 h-4 w-4" />,
            },
            {
              label: "Theme",
              href: "/settings/preferences/theme",
              icon: <LifeBuoy className="mr-2 h-4 w-4" />,
            },
          ],
        },
      ],
    },
    {
      label: "Actions",
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
      items: [
        {
          label: "Action 1",
          onClick: () => alert("Action 1"),
          icon: <Plus className="mr-2 h-4 w-4" />,
        },
        {
          label: "Action 2",
          onClick: () => alert("Action 2"),
          icon: <Plus className="mr-2 h-4 w-4" />,
        },
      ],
    },
  ]
  return (
    <DropdownMenu
      className="min-w-[200px]"
      items={items}
      trigger={<Button variant={"default"}>Open</Button>}
    />
  )
}
