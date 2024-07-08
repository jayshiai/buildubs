import { Avatar } from "dubsui"

export default function AvatarDemo() {
  return (
    <Avatar
      className="w-24 h-24"
      src="/images/avatars/profile.jpg"
      fallback="avatar"
    />
  )
}
