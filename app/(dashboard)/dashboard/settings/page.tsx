import { redirect } from "next/navigation"

import { getCurrentUserServer } from "@/lib/serversession"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

// import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        {/* <UserNameForm user={{ id: user.id, name: user.name || "" }} /> */}
        No settings available yet.
      </div>
    </DashboardShell>
  )
}
