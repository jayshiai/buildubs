import { AvatarFallback, AvatarImage, AvatarRoot } from "dubsui"

export default function AvatarGranular() {
  return (
    <AvatarRoot>
      <AvatarImage src="/images/avatars/profile.jpg" />
      <AvatarFallback>avatar</AvatarFallback>
    </AvatarRoot>
  )
}
