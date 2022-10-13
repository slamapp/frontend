import { Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { env } from "~/constants"

const socketUrl = `${env.SERVICE_API_END_POINT}${env.SERVICE_API_SUB_FIX}`

export default {
  getCompatClient: () => Stomp.over(new SockJS(socketUrl)),
} as const
