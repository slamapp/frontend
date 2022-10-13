import { useEffect, useState } from "react"
import type { CompatClient, messageCallbackType } from "@stomp/stompjs"
import { api } from "~/api"
import { useCurrentUserQuery } from "~/features/users"
import { getCookieToken } from "~/utils"

type UseStomp = () => {
  isConnected: boolean
  isLoading: boolean
  sendAuth: (destination: string, body: { [x: string]: any }) => void
}

const useStomp: UseStomp = () => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const currentUserQuery = useCurrentUserQuery()

  useEffect(() => {
    if (currentUserQuery.isSuccess) {
      const newClient = api.sockets.getCompatClient()
      newClient.connect(
        { Authorization: { token: `Bearer ${getCookieToken()}` } },
        () => {
          if (!currentUserQuery.isSuccess) {
            return
          }
          setIsConnected(true)
          setIsLoading(false)
          subscribe(
            newClient,
            `/user/${currentUserQuery.data.id}/notification`,
            (body) => {
              console.log(body)
            }
          )
          subscribe(newClient, `/user/${`courtId`}/chat`, (body) => {
            console.log(body)
          })
        },
        (e: any) => {
          console.log(e)
          setIsLoading(false)
        }
      )

      setCompatClient(newClient)

      return () => newClient.disconnect()
    }
  }, [currentUserQuery.isSuccess, currentUserQuery.data?.id])

  const sendAuth: ReturnType<UseStomp>["sendAuth"] = (destination, body) => {
    console.log("SEND,Token", "destination:", destination, "body:", body)

    const bodyStringified = JSON.stringify(body)
    if (compatClient && getCookieToken()) {
      compatClient.send(
        destination,
        { token: getCookieToken() },
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
