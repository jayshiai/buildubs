"use client"

import { useState } from "react"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"

interface Post {
  domain: string
}

interface PostItemProps {
  post: Pick<Post, "domain">
}

export function PostItem({ post }: PostItemProps) {
  const [domain, setDomain] = useState(post.domain)
  if (!domain) return null
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`http://${domain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          className="font-semibold hover:underline"
        >
          {domain}
        </Link>
      </div>
      <PostOperations
        post={{ id: domain }}
        domain={domain}
        setDomain={setDomain}
      />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
