import { useAuthContext } from "@contexts/hooks";
import { CompatClient } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { socketApi } from "service";
import { SendAuth, UseStomp } from "./type";

const useStomp: UseStomp = (token: string) => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authProps } = useAuthContext();
  const {
    currentUser: { userId },
  } = authProps;

  const handleError = useCallback((e) => {
    console.log(e);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userId) {
      try {
        const newClient = socketApi.getCompatClient();
        setCompatClient(newClient);
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      if (compatClient) compatClient.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (compatClient) {
      compatClient.connect(
        { token: `Bearer ${token}` },
        () => {
          setIsConnected(true);
          setIsLoading(false);
          compatClient.subscribe("/topic/teston", ({ body }) => {
            console.log("/topic/teston:::::", body);
          });

          compatClient.subscribe(`/topic/${userId}`, ({ body }) => {
            console.log(`/topic/${userId}`, body);
          });
        },
        handleError
      );
    }
  }, [compatClient]);

  const sendAuth: SendAuth = (destination, body) => {
    const bodyStringified = JSON.stringify(body);
    if (compatClient && token)
      compatClient.send(destination, { token }, bodyStringified);
  };

  return { isConnected, isLoading, sendAuth };
};

export default useStomp;
