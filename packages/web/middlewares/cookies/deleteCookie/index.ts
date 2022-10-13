import type { NextRequest, NextResponse } from "next/server"

const deleteCookie = (
  request: NextRequest,
  response: NextResponse,
  cookie: string
) => {
  const { value, options } = request.cookies.getWithOptions(cookie)
  if (value) {
    response.cookies.set(cookie, value, options)
    response.cookies.delete(cookie)
  }

  return response
}

export default deleteCookie
