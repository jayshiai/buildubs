import React, { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useEditor } from "@craftjs/core"
import { set } from "date-fns"
import { CirclePlus, Loader2 } from "lucide-react"
import LZUTF8 from "lzutf8"

import {
  checkIfDomainExists,
  deployDataForNewDomain,
  insertDomainToDatabase,
} from "@/lib/editorUtils/deploy"
import { getSites } from "@/lib/session"
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  const [newDomain, setNewDomain] = useState(false)
  const [sites, setSites] = useState([])
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

  useEffect(() => {
    const fetchSites = async () => {
      setIsDeploying(true)
      console.log("Fetching sites")
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const data = await getSites(user.id)
      if (data.length === 0) {
        setIsDeploying(false)
        return
      }

      console.log("Sites:", data)
      setSites(data)
      setSelectedDomain(data[0].domain)
      setIsDeploying(false)
    }

    if (isLoggedIn) {
      fetchSites()
    }
  }, [isLoggedIn])

  const handleDeploy = async (currentDomain: string) => {
    setIsDeploying(true)
    const serializedData = query.serialize()
    // console.log("Serialized data:", serializedData)
    const compressedData = LZUTF8.compress(JSON.stringify(serializedData), {
      outputEncoding: "Base64",
    })
    const domain = await deployDataForNewDomain(
      supabase,
      compressedData,
      currentDomain
    )
    setIsDeploying(false)
    if (!domain) {
      setIsDialogOpen(true) // Show the dialog if domain is not found
      return
    }

    // Proceed with deployment using the found domain
    console.log("Domain found, deploying data")
    setSites([...sites, { domain }])
    setIsDialogOpen(false)
    // Add your deployment logic here
  }

  const handleDomainSelect = async () => {
    setDomainError("")
    setIsDeploying(true)
    console.log("Selected domain:", selectedDomain)
    if (
      selectedDomain == "ui" ||
      selectedDomain == "cy" ||
      selectedDomain == "www"
    ) {
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
    setNewDomain(false)

    handleDeploy(selectedDomain)
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
                setIsDialogOpen(true)
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
              Choose a domain to deploy your site.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {sites?.length == 0 ? null : (
            <>
              <RadioGroup
                onValueChange={(value) => {
                  console.log("Selected domain:", value)
                  setSelectedDomain(value)
                }}
                className="flex flex-wrap gap-2 "
                defaultValue={sites[0].domain}
              >
                {sites.map((site) => (
                  <div
                    key={site.domain}
                    className="flex items-center space-x-2 min-w-[100px] border p-2 rounded-lg"
                  >
                    <RadioGroupItem value={site.domain} id={site.domain} />
                    <Label htmlFor={site.domain}>{site.domain}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
          <Button
            variant="outline"
            onClick={() => setNewDomain(true)}
            className="w-[170px]"
          >
            <CirclePlus className="h-4 w-4 mr-2" />
            Add new domain
          </Button>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={() => {
                if (sites.length == 0) {
                  handleDomainSelect()
                } else {
                  handleDeploy(selectedDomain)
                }
              }}
              disabled={isDeploying || !selectedDomain}
              className="gap-2"
            >
              Submit
              <Loader2 className={isDeploying ? "animate-spin" : "hidden"} />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={newDomain} onOpenChange={setNewDomain}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Domain</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a unique domain to deploy your site.
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
            <AlertDialogCancel onClick={() => setNewDomain(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={() => handleDomainSelect()}
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
