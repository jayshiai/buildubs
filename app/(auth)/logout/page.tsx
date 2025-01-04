"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

import { Icons } from "@/components/icons"

export default function LogoutPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const supabase = createClient()

        // Ensure supabase client is properly initialized
        if (!supabase) {
          throw new Error("Failed to initialize Supabase client")
        }

        // Add a small delay to ensure client is ready
        await new Promise((resolve) => setTimeout(resolve, 500))

        const { error: signOutError } = await supabase.auth.signOut()

        if (signOutError) {
          throw signOutError
        }

        // Log success in both development and production
        console.log("User signed out successfully")

        // Clear any local storage items if needed
        localStorage.removeItem("supabase.auth.token")

        // Add a small delay before redirect to ensure logout completes
        await new Promise((resolve) => setTimeout(resolve, 500))

        router.replace("/")
      } catch (err) {
        console.error("Logout error:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    handleSignOut()
  }, [router])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLoading ? "Logging Out..." : "Logged Out"}
          </h1>
          {error && (
            <p className="text-sm text-red-500">
              Error logging out: {error}. Redirecting...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
