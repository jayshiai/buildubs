import Link from "next/link"
import { Post } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"

interface PostItemProps {
  post: Pick<Post, "id">
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`https://${post.id}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          className="font-semibold hover:underline"
        >
          {post.id}
        </Link>
      </div>
      <PostOperations post={{ id: post.id }} />
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
