import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/", // Redirect to the landing page for sign in
  },
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
