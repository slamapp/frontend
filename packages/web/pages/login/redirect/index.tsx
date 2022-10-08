import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Spinner } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useAuthContext } from "~/contexts/hooks"
import { useLocalToken } from "~/hooks/domain"

const RedirectPage = () => {
  const [isNeedReLogin, setIsNeedReLogin] = useState(false)
  const [, setToken] = useLocalToken()
  const { authProviderInit } = useAuthContext()
  const router = useRouter()

  const getCurrentUserData = useCallback(async () => {
    setToken(router.query.token as string)
    try {
      await authProviderInit()
      router.replace("/")
    } catch (error) {
      console.error(error)
      setIsNeedReLogin(true)
    }
  }, [router.query.token as string, authProviderInit, setToken])

  useEffect(() => {
    if (router.query.token) {
      getCurrentUserData()
    }
  }, [router.query.token as string])

  return (
    <PageContainer>
      {isNeedReLogin ? (
        <div>
          <Link href="/login" passHref>
            <a>
              <button>다시 로그인하러 가기</button>
            </a>
          </Link>
        </div>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  )
}

export default RedirectPage

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
