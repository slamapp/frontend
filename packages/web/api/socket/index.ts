import { Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"

const endPoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string
const subfix = process.env.NEXT_PUBLIC_SERVICE_WS_SUB_FIX as string
const socketUrl = `${endPoint + subfix}`

export default {
  getCompatClient: () => Stomp.over(new SockJS(socketUrl)),
} as const
