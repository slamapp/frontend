import { useCallback, useEffect, useState } from "react"
import type { CompatClient, messageCallbackType } from "@stomp/stompjs"
import { api } from "~/api"
import { useAuthContext } from "~/contexts/hooks"
import type { APINotification } from "~/types/domains/objects"
import { getLocalToken } from "~/utils"

type UseStomp = () => {
  isConnected: boolean
  isLoading: boolean
  sendAuth: (destination: string, body: { [x: string]: any }) => void
}

const useStomp: UseStomp = () => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { authProps, unshiftNotification } = useAuthContext()

  const handleError = useCallback((e: any) => {
    console.log(e)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (authProps.currentUser) {
      const newClient = api.sockets.getCompatClient()
      newClient.connect(
        { Authorization: { token: `Bearer ${getLocalToken()}` } },
        () => {
          if (!authProps.currentUser) {
            return
          }
          setIsConnected(true)
          setIsLoading(false)
          subscribe(
            newClient,
            `/user/${authProps.currentUser.id}/notification`,
            (body) => {
              console.log(body)
              unshiftNotification(body as APINotification)
            }
          )
          subscribe(newClient, `/user/${`courtId`}/chat`, (body) => {
            console.log(body)
          })
        },
        handleError
      )

      setCompatClient(newClient)

      return () => newClient.disconnect()
    }
  }, [authProps.currentUser])

  const sendAuth: ReturnType<UseStomp>["sendAuth"] = (destination, body) => {
    console.log("SEND,Token", "destination:", destination, "body:", body)

    const bodyStringified = JSON.stringify(body)
    if (compatClient && getLocalToken()) {
      compatClient.send(
        destination,
        { token: getLocalToken() },
        bodyStringified
      )
    }
  }

  return { isConnected, isLoading, sendAuth }
}

export default useStomp

type ParsedCallback = (parsedBody: { [x: string]: any }) => void

const subscribe = (
  compatClient: CompatClient,
  destination: string,
  parsedCallback: ParsedCallback
) => compatClient.subscribe(destination, getParsedCallback(parsedCallback))

const getParsedCallback =
  (parsedCallback: ParsedCallback): messageCallbackType =>
  ({ body }) => {
    const defaultParsed = {}
    try {
      const parsedBody = JSON.parse(body)
      console.log("::SUBSCRIBE::", parsedBody)
      parsedCallback(parsedBody)
    } catch (error) {
      console.error(error)
      parsedCallback(defaultParsed)
    }
  }
