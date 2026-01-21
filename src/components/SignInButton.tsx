"use client"

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { useAuth } from "./AuthProvider"

export default function SignInButton() {
  const { user } = useAuth()
  const provider = new GoogleAuthProvider()

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google", error)
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out", error)
    }
  }

  if (user) {
    return (
      <button
        onClick={signOut}
        className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Sign out
      </button>
    )
  }
  return (
    <button
      onClick={signIn}
      className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
    >
      Sign in with Google
    </button>
  )
}
