import { CompatClient } from "@stomp/stompjs";

export interface Api {
  getWebSocket: () => WebSocket;
  getCompatClient: () => CompatClient;
}
