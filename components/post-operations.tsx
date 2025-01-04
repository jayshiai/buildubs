"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { set } from "date-fns"
import { Loader2 } from "lucide-react"

import {
  checkIfDomainExists,
  updateDomainToDatabase,
} from "@/lib/editorUtils/deploy"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

async function deleteSite(postId: string) {
  const supabase = createClient()
  const sess = await supabase.auth.getSession()
  const userId = sess?.data?.session?.user?.id
  const { data, error } = await supabase
    .from("domains")
    .delete()
    .eq("user_id", userId)

  if (error) {
    toast({
      title: "Something went wrong.",
      description: "Your site was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

interface Post {
  id: string
}

interface PostOperationsProps {
  post: Pick<Post, "id">
  setDoamin: (domain: string) => void
}

export function PostOperations({ post, setDoamin }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedDomain, setSelectedDomain] = React.useState("")
  const [domainError, setDomainError] = React.useState("")
  const [isDeploying, setIsDeploying] = React.useState(false)

  const handleDomainSelect = async () => {
    const supabase = createClient()
    setDomainError("")
    setIsDeploying(true)
    console.log("Selected domain:", selectedDomain)
    if (selectedDomain == "ui" || selectedDomain == "cy") {
      setDomainError(
        "This domain is reserved. Please choose a different domain."
      )
      setIsDeploying(false)
      return
    }
    const isDomainTaken = await checkIfDomainExists(supabase, selectedDomain)
    console.log("Is domain taken:", isDomainTaken)
    if (isDomainTaken) {
      setDomainError(
        "The selected domain already exists. Please choose a different domain."
      )
      setIsDeploying(false)
      return
    }

    console.log("Inserting domain to database")

    const updated = await updateDomainToDatabase(supabase, selectedDomain)

    if (!updated) {
      setDomainError("Error updating domain")
      return
    }
    setIsDeploying(false)
    setIsDialogOpen(false)
    setDoamin(selectedDomain)
  }
  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Select a Domain</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter a unique domain name for your deployment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <Input
              type="text"
              placeholder="Enter domain name"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="input"
            />
            {domainError && (
              <p className=" text-destructive text-sm mt-2">{domainError}</p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleDomainSelect}
              disabled={isDeploying || !selectedDomain}
              className="gap-2"
            >
              Submit
              <Loader2 className={isDeploying ? "animate-spin" : "hidden"} />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <div onClick={() => setIsDialogOpen(true)} className="w-full">
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteSite(post.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
