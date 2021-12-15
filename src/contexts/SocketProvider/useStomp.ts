import { useLocalToken } from "@hooks/domain";
import { CompatClient } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { socketApi } from "service";

type UseStomp = () => [
  compatClient: CompatClient | null,
  isConnected: boolean,
  isLoading: boolean
];

const userId = 1;

const useStomp: UseStomp = () => {
  const [token, _] = useLocalToken();
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((e) => {
    console.log(e);
    setIsLoading(false);
  }, []);

  console.log("isLoading", isLoading, "isConnected", isConnected);

  useEffect(() => {
    try {
      const compatClient = socketApi.getCompatClient();
      setCompatClient(compatClient);
    } catch (error) {
      console.error(error);
    }

    return () => {
      if (compatClient) compatClient.disconnect();
    };
  }, []);

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

  return [compatClient, isConnected, isLoading];
};

export default useStomp;
