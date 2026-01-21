"use client"

import { useAuth } from "./AuthProvider"
import SignInButton from "./SignInButton"

export default function Header() {
  const { user } = useAuth()
  return (
    <header className="flex h-20 w-full items-center justify-between px-4 md:px-6">
      <a className="text-lg font-semibold" href="#">
        Landed Edge
      </a>
      <div className="flex items-center gap-4">
        {user && <p className="text-sm">Signed in as {user.displayName}</p>}
        <SignInButton />
      </div>
    </header>
  )
}
