import React, { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useEditor } from "@craftjs/core"
import { Loader2 } from "lucide-react"
import LZUTF8 from "lzutf8"

import {
  checkIfDomainExists,
  deployDataForNewDomain,
  insertDomainToDatabase,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const DeployButton = () => {
  const { query } = useEditor()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState("")
  const [domainError, setDomainError] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const supabase = createClient()
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }

    checkUser()
  }, [supabase])

  const handleDeploy = async () => {
    setIsDeploying(true)
    const serializedData = query.serialize()
    console.log("Serialized data:", serializedData)
    const compressedData = LZUTF8.compress(JSON.stringify(serializedData), {
      outputEncoding: "Base64",
    })
    const domain = await deployDataForNewDomain(supabase, compressedData)
    setIsDeploying(false)
    if (!domain) {
      setIsDialogOpen(true) // Show the dialog if domain is not found
      return
    }

    // Proceed with deployment using the found domain
    console.log("Domain found, deploying data")
    // Add your deployment logic here
  }

  const handleDomainSelect = async () => {
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

    const inserted = await insertDomainToDatabase(supabase, selectedDomain)

    if (!inserted) {
      setDomainError("Error inserting domain")
      return
    }
    setIsDialogOpen(false)

    handleDeploy()
  }
  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={
                isLoggedIn ? "gap-2" : "gap-2 opacity-50  cursor-not-allowed"
              }
              onClick={() => {
                handleDeploy()
              }}
              disabled={isDeploying}
            >
              Deploy
              <Loader2 className={isDeploying ? "animate-spin" : "hidden"} />
            </Button>
          </TooltipTrigger>
          {!isLoggedIn ? (
            <TooltipContent side="bottom">Login to deploy</TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>

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
    </>
  )
}

export default DeployButton
