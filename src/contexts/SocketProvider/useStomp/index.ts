import { Notification } from "@contexts/AuthProvider/types";
import { useAuthContext } from "@contexts/hooks";
import { CompatClient } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { socketApi } from "service";
import { SendAuth, UseStomp } from "./type";
import { subscribe } from "./utils";

const useStomp: UseStomp = (token: string) => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authProps, pushNotification } = useAuthContext();
  const {
    currentUser: { userId },
  } = authProps;

  const handleError = useCallback((e) => {
    console.log(e);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const newClient = socketApi.getCompatClient();
    setCompatClient(newClient);

    return () => {
      if (compatClient) compatClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (compatClient && userId) {
      compatClient.connect(
        { Authorization: { token: `Bearer ${token}` } },
        () => {
          setIsConnected(true);
          setIsLoading(false);

          subscribe(compatClient, `/topic/${userId}`, (body) => {
            console.log(body);
          });
          subscribe(compatClient, `/user/${userId}/notification`, (body) => {
            console.log(body);

            pushNotification(body as Notification);
          });
        },
        handleError
      );
    }
  }, [userId]);

  const sendAuth: SendAuth = (destination, body) => {
    console.log("SEND,Token", "destination:", destination, "body:", body);

    const bodyStringified = JSON.stringify(body);
    if (compatClient && token)
      compatClient.send(destination, { token }, bodyStringified);
  };

  return { isConnected, isLoading, sendAuth };
};

export default useStomp;
