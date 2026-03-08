export { auth as middleware } from "@/auth"

export const config = {
  // This "matcher" ensures auth is required for everything EXCEPT 
  // static files, images, and the actual auth API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}