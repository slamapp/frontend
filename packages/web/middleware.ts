import type { NextMiddleware } from "next/server"
import { NextResponse } from "next/server"
import { TOKEN_KEY } from "./constants"

const privatePaths = ["/user", "/courts/create", "/chat/list", "/reservations"]
const privateRedirectPath = "/login"

const preventedPaths = ["/login"]
const preventedRedirectPath = "/map"

const middleware: NextMiddleware = (request) => {
  const slamToken = request.cookies.get(TOKEN_KEY)

  if (slamToken) {
    if (
      preventedPaths.reduce(
        (acc, path) => acc || request.nextUrl.pathname.includes(path),
        false
      )
    ) {
      const nextUrl = request.nextUrl.clone()
      nextUrl.pathname = preventedRedirectPath
      nextUrl.search = ""

      return NextResponse.redirect(nextUrl)
    }
  } else if (
    privatePaths.reduce(
      (acc, path) => acc || request.nextUrl.pathname.includes(path),
      false
    )
  ) {
    const nextUrl = request.nextUrl.clone()
    nextUrl.pathname = privateRedirectPath
    nextUrl.search = ""

    return NextResponse.redirect(nextUrl)
  }
}

export default middleware
