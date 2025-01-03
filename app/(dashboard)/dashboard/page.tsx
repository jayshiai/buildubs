"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getCurrentUser, getSites } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser()
      if (!user) {
        redirect("/login")
      }
      setUser(user)
      const sites = await getSites(user.id)
      setSites(sites)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Sites" text="Create and manage sites.">
        {/* Add a button for creating sites, and call `handleSiteCreated` when successful */}
      </DashboardHeader>
      <div>
        {sites?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {sites.map((site) => (
              <PostItem key={site.id} post={site} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No sites created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any sites yet. Start creating using our
              Builder.
            </EmptyPlaceholder.Description>
            <Link href="/builder">
              <Button variant="outline">
                <Icons.add className="mr-2 h-4 w-4" /> Create a site
              </Button>
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
