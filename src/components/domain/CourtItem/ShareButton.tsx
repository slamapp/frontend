import { useCallback } from "react";

import { IconButton } from "@components/base";

const ShareButton = () => {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") {
      return alert("공유하기 실패");
    }
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({
      requestUrl: location.href,
    });
  }, []);

  return <IconButton name="share-2" onClick={handleClick} />;
};

export default ShareButton;
