"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Sign out
      </button>
    )
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
    >
      Sign in with Google
    </button>
  )
}
