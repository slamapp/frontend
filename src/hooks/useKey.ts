import { useCallback, useEffect } from "react";
import { EventKeyValue } from "./EventKeyValueType";

type KeyEvent = "keydown" | "keyup";
type Handler = () => void;

const useKey = (
  event: KeyEvent = "keydown",
  targetKey: EventKeyValue,
  handler: Handler
) => {
  const handleKey = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey);

    return () => {
      window.removeEventListener(event, handleKey);
    };
  }, [event, targetKey, handleKey]);
};

export default useKey;
