import { Avatar } from "dubsui"

import { cn } from "@/lib/utils"

export default function AvatarDemo({ className }) {
  return (
    <Avatar
      className={cn("w-12 h-12", className)}
      src="/images/avatars/profile.jpg"
      fallback="avatar"
    />
  )
}
