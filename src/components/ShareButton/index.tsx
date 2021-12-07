import React from "react";

const ShareButton = () => {
  const onClick = () => {
    if (typeof window === "undefined") {
      return alert("공유하기 실패");
    }
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({
      requestUrl: location.href,
    });
  };
  return <button onClick={onClick}>공유하기</button>;
};

export default ShareButton;
