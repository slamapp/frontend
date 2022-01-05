import { useEffect } from "react";

const useKakaoMapEvent = <T extends kakao.maps.event.EventTarget>(
  target: T | undefined,
  type: string,
  callback: ((target: T, ...args: any[]) => void) | undefined
) => {
  useEffect(() => {
    if (!target || !callback) {
      return;
    }

    const wrapCallback = (...arg: any[]) => {
      if (arg === undefined) {
        return callback(target);
      }
      return callback(target, ...arg);
    };

    kakao.maps.event.addListener(target, type, wrapCallback);

    return () => {
      kakao.maps.event.removeListener(target, type, wrapCallback);
    };
  }, [target, type, callback]);
};

export default useKakaoMapEvent;
