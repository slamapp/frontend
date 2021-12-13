import { useLocalToken } from "@hooks/domain";
import { CompatClient } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { socketApi } from "service";

type UseStomp = () => [
  compatClient: CompatClient | null,
  isConnected: boolean,
  isLoading: boolean
];

const useStomp: UseStomp = () => {
  const [token, _] = useLocalToken();
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleConnected = useCallback(() => {
    setIsConnected(true);
  }, []);
  const handleError = useCallback(() => {}, []);
  const handleClose = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    try {
      const options = {};
      const compatClient = socketApi.getCompatClient(options);
      setCompatClient(compatClient);
    } catch (error) {
      console.error(error);
    }

    if (compatClient) {
      compatClient.connect(
        { token: `Beaer ${token}` },
        handleConnected,
        handleError,
        handleClose
      );
    }

    return () => {
      if (compatClient) compatClient.disconnect();
    };
  }, []);

  return [compatClient, isConnected, isLoading];
};

export default useStomp;
