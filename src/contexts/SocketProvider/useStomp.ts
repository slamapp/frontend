import { CompatClient } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { socketApi } from "service";

type UseStomp = () => [
  compatClient: CompatClient | null,
  isSocketReady: boolean
];

const useStomp: UseStomp = () => {
  const [compatClient, setCompatClient] = useState<CompatClient | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);

  useEffect(() => {
    try {
      const options = {};
      const compatClient = socketApi.getCompatClient(options);
      setCompatClient(compatClient);
    } catch (error) {
      console.error(error);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (compatClient?.connected) setIsSocketReady(true);
  }, [compatClient?.connected]);

  return [compatClient, isSocketReady];
};

export default useStomp;
