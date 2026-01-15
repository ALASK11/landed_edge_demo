import SignInButton from "./SignInButton"

export default function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between px-4 md:px-6">
      <a className="text-lg font-semibold" href="#">
        Landed Edge
      </a>
      <SignInButton />
    </header>
  )
}
