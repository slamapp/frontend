import { useCallback, useEffect, useState } from "react";

import loadSdk from "./loadSdk";
import { ExtendedWindow, Props } from "./types";

declare let window: ExtendedWindow;

const KakaoLogin = ({
  token,
  throughTalk = true,
  persistAccessToken = true,
  needProfile = true,
  useLoginForm = false,
  onSuccess,
  onFail,
  onLogout,
  children = "카카오로 로그인하기",
}: Props) => {
  const [{ isLoggedIn }, setState] = useState({
    isLoggedIn: false,
  });

  const initKakao = useCallback(async () => {
    await loadSdk();
    window.Kakao.init(token);
  }, [token]);

  useEffect(() => {
    initKakao();
  }, [initKakao]);

  const handleButtonClick = () => {
    const method = useLoginForm ? "loginForm" : "login";
    (window.Kakao?.Auth)[method]({
      throughTalk,
      persistAccessToken,
      success: (response) => {
        setState({ isLoggedIn: true });
        if (needProfile) {
          window.Kakao?.API.request({
            url: "/v2/user/me",
            success: (profile) => {
              const result = { response, profile };
              onSuccess(result);
            },
            fail: onFail,
          });
        } else {
          onSuccess({ response });
        }
      },
      fail: onFail,
    });
    // window.Kakao.Auth.authorize({
    //   redirectUri: "localhost:8080",
    //   state: "hi, hello",
    //   scope: "account_email,gender",
    // });
  };

  const handleLogout = () => {
    window.Kakao?.Auth.logout(() => {
      const a = window.Kakao?.Auth.getAccessToken();
      onLogout?.();
      setState({ isLoggedIn: false });
    });
  };

  const handleClick = isLoggedIn ? handleLogout : handleButtonClick;

  return (
    <span onClick={handleClick}>
      {isLoggedIn ? (
        <button type="button">로그아웃</button>
      ) : (
        <button type="button">{children}</button>
      )}
    </span>
  );
};

export default KakaoLogin;
