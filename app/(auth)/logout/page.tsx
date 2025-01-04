"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

import { Icons } from "@/components/icons"

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    const supabase = createClient()

    const signOut = async () => {
      const { error } = await supabase.auth.signOut()
      console.log("User signed out: ", error)
      router.push("/") // Redirect to home page
    }

    signOut()
  }, [])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Logging Out</h1>
        </div>
      </div>
    </div>
  )
}
