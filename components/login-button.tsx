"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

import { Icons } from "@/components/icons"

import { Button } from "./ui/button"

const LoginButton = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const supabase = createClient()

    // Fetch user once on load
    const fetchUser = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getUser()
      setUser(data?.user)
      setLoading(false)
    }
    fetchUser()

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
      }
    )

    // Cleanup the subscription on unmount
    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    // Optionally, you could return null or a skeleton loader
    return (
      <Button variant="ghost" size="sm" className="mr-5 font-mono">
        <Icons.logo className=" animate-spin h-4 w-4" />
      </Button>
    )
  }

  return (
    <>
      {!user ? (
        <Link href={"/login"}>
          <Button variant="default" size="sm" className="mr-5 font-sans">
            Login
          </Button>
        </Link>
      ) : (
        <Link href={"/dashboard"}>
          <Button variant="outline" size="sm" className="mr-5 font-sans">
            Dashboard
          </Button>
        </Link>
      )}
    </>
  )
}

export default LoginButton
