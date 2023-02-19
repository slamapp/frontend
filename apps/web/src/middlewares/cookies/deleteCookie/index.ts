import { NextRequest, NextResponse } from 'next/server'

const deleteCookie = (request: NextRequest, response: NextResponse, cookie: string) => {
  const cookieValue = request.cookies.get(cookie)
  if (cookieValue?.value) {
    response.cookies.delete(cookie)
  }

  return response
}

export default deleteCookie
