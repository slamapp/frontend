import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketApi = {
  getWebSocket: (options: SockJS.Options) => {
    const endPoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT;
    const socketUrl = `${endPoint}`;
    return new SockJS(socketUrl, undefined, options);
  },
  getCompatClient: (options: SockJS.Options) => {
    const webSocket = socketApi.getWebSocket(options);
    return Stomp.over(webSocket);
  },
};

export default socketApi;
