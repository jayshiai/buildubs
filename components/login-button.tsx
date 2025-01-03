"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

import { Button } from "./ui/button"

const LoginButton = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setUser(data?.user)
      console.log(data)
    }
    fetchUser()
  }, [])

  return (
    <>
      {!user ? (
        <Link href={"/login"}>
          <Button variant="default" size="sm" className="mr-5 font-mono">
            Login
          </Button>
        </Link>
      ) : (
        <Link href={"/dashboard"}>
          <Button variant="outline" size="sm" className="mr-5 font-mono">
            Dashboard
          </Button>
        </Link>
      )}
    </>
  )
}

export default LoginButton
