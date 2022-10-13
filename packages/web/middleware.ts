import type { NextMiddleware } from "next/server"
import { NextResponse } from "next/server"
import { env } from "~/constants"
import { deleteCookie } from "~/middlewares/cookies"
import { verify } from "~/middlewares/jwt"

const PRIVATE_PATHS = ["/user", "/courts/create", "/chat/list", "/reservations"]
const PRIVATE_REDIRECT_PATH = "/map"

const PREVENTED_PATHS = ["/login"]
const PREVENTED_REDIRECT_PATH = "/"

const middleware: NextMiddleware = async (request) => {
  const slamToken = request.cookies.get(env.SLAM_TOKEN_KEY)

  if (slamToken) {
    const isJwtVerified = await verify(slamToken, env.JWT_SECRET_KEY)

    if (
      PREVENTED_PATHS.reduce(
        (acc, path) => acc || request.nextUrl.pathname.includes(path),
        false
      )
    ) {
      if (isJwtVerified) {
        const nextUrl = request.nextUrl.clone()
        nextUrl.pathname = PREVENTED_REDIRECT_PATH
        nextUrl.search = ""

        return NextResponse.redirect(nextUrl)
      }
    }
  }

  if (
    PRIVATE_PATHS.reduce(
      (acc, path) => acc || request.nextUrl.pathname.includes(path),
      false
    ) ||
    request.nextUrl.pathname === "/"
  ) {
    if (slamToken) {
      const isJwtVerified = await verify(slamToken, env.JWT_SECRET_KEY)

      if (!isJwtVerified) {
        const nextUrl = request.nextUrl.clone()
        nextUrl.pathname = PRIVATE_REDIRECT_PATH
        nextUrl.search = ""

        const response = deleteCookie(
          request,
          NextResponse.redirect(nextUrl),
          env.SLAM_TOKEN_KEY
        )

        return response
      }
    } else {
      const nextUrl = request.nextUrl.clone()
      nextUrl.pathname = PRIVATE_REDIRECT_PATH
      nextUrl.search = ""

      return NextResponse.redirect(nextUrl)
    }
  }
}

export default middleware
