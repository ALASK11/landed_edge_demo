import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("authenticated")?.value === "true"
  const isAtRoot = request.nextUrl.pathname === "/"

  if (isAtRoot) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/upload", request.url))
    }
    return NextResponse.next()
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
