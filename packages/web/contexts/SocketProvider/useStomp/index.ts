import { useCallback, useEffect, useState } from "react"
import type { CompatClient } from "@stomp/stompjs"
import { api } from "~/api"
import { useAuthContext } from "~/contexts/hooks"
import type { APINotification } from "~/types/domains"
import type { SendAuth, UseStomp } from "./type"
import { subscribe } from "./utils"

const useStomp: UseStomp = (token: string) => {
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
      const newClient = api.socket.getCompatClient()
      newClient.connect(
        { Authorization: { token: `Bearer ${token}` } },
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

  const sendAuth: SendAuth = (destination, body) => {
    console.log("SEND,Token", "destination:", destination, "body:", body)

    const bodyStringified = JSON.stringify(body)
    if (compatClient && token) {
      compatClient.send(destination, { token }, bodyStringified)
    }
  }

  return { isConnected, isLoading, sendAuth }
}

export default useStomp
