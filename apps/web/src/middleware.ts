import { NextMiddleware, NextResponse } from 'next/server'
import { PROXY_PRE_FIX, env } from '~/constants'
import { deleteCookie } from '~/middlewares/cookies'
import { verify } from '~/middlewares/jwt'

const PRIVATE_PATHS = ['/user', '/courts/create', '/chat/list', '/reservations']
const PRIVATE_REDIRECT_PATH = '/map'

const PREVENTED_PATHS = ['/login']
const PREVENTED_REDIRECT_PATH = '/'

const middleware: NextMiddleware = async (request) => {
  const slamToken = request.cookies.get(env.SLAM_TOKEN_KEY)
  const isProxy = request.nextUrl.pathname.startsWith(PROXY_PRE_FIX)

  // 프록시
  if (isProxy) {
    const { search } = request.nextUrl
    const pathname = request.nextUrl.pathname.substring(PROXY_PRE_FIX.length)
    const destination = `${env.SERVICE_API_END_POINT}${pathname}${search}`
    const headers = new Headers(request.headers)
    if (slamToken) {
      headers.set('Authorization', `Bearer ${slamToken.value}`)
    }

    return NextResponse.rewrite(destination, { request: { headers } })
  }

  // 로그인 리다이렉트
  if (request.nextUrl.pathname.startsWith('/login/redirect')) {
    const token = request.nextUrl.searchParams.get('token') ?? ''
    const isJwtVerified = await verify(token, env.JWT_SECRET_KEY)

    const nextUrl = request.nextUrl.clone()
    nextUrl.pathname = isJwtVerified ? PREVENTED_REDIRECT_PATH : PRIVATE_REDIRECT_PATH
    nextUrl.search = ''

    const response = NextResponse.redirect(nextUrl)

    if (isJwtVerified) {
      response.cookies.set(env.SLAM_TOKEN_KEY, token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: env.IS_PRODUCTION_MODE,
      })
    }

    return response
  }

  // 로그아웃
  if (request.nextUrl.pathname.startsWith('/logout')) {
    console.log('logout', env.SLAM_TOKEN_KEY)

    const nextUrl = request.nextUrl.clone()
    nextUrl.pathname = '/login'
    nextUrl.search = ''

    const response = NextResponse.redirect(nextUrl)
    response.cookies.set(env.SLAM_TOKEN_KEY, '', {
      expires: new Date('Thu, 01 Jan 1999 00:00:10 GMT'),
    })

    return response
  }

  // 토큰이 있는 경우
  if (slamToken) {
    const isJwtVerified = await verify(slamToken.value, env.JWT_SECRET_KEY)

    if (PREVENTED_PATHS.reduce((acc, path) => acc || request.nextUrl.pathname.includes(path), false)) {
      if (isJwtVerified) {
        const nextUrl = request.nextUrl.clone()
        nextUrl.pathname = PREVENTED_REDIRECT_PATH
        nextUrl.search = ''

        return NextResponse.redirect(nextUrl)
      }
    }
  }

  const isPrivatePath =
    !!PRIVATE_PATHS.find((path) => request.nextUrl.pathname.includes(path)) || request.nextUrl.pathname === '/'

  if (isPrivatePath) {
    if (slamToken) {
      const isJwtVerified = await verify(slamToken.value, env.JWT_SECRET_KEY)

      if (!isJwtVerified) {
        const nextUrl = request.nextUrl.clone()
        nextUrl.pathname = PRIVATE_REDIRECT_PATH
        nextUrl.search = ''

        const response = deleteCookie(request, NextResponse.redirect(nextUrl), env.SLAM_TOKEN_KEY)

        return response
      }
    } else {
      const nextUrl = request.nextUrl.clone()
      nextUrl.pathname = PRIVATE_REDIRECT_PATH
      nextUrl.search = ''

      return NextResponse.redirect(nextUrl)
    }
  }
}

export default middleware
