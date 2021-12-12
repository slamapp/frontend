import type { NextPage } from "next";
import Head from "next/head";
import { KakaoLogin } from "@components/domain";
import { useNavigationContext } from "@contexts/NavigationProvider";
import Link from "next/link";
import axios from "axios";
import { MouseEvent } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.LOGIN);
  const router = useRouter();

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
  const handleClick = () => router.replace(kakaoUrl);

  const jellyKakaoUrl = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

  return (
    <div>
      <Head>
        <title>로그인 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <Link href={jellyKakaoUrl}>
        <a>젤리의 카카오 계정 로그인</a>
      </Link>

      <button onClick={handleClick}>카카오 계정 로그인</button>

      <Link href={kakaoUrl}>
        <a>카카오 계정 로그인</a>
      </Link>

      <KakaoLogin
        token={process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string}
        onSuccess={(result) => {
          alert(`로그인에 성공하셨습니다. ${JSON.stringify(result)}`);
          console.log(result);
        }}
        onFail={(result) => {
          alert(`로그인에 실패하셨습니다. ${JSON.stringify(result)}`);
          console.log(result);
        }}
        onLogout={() => {
          alert(`로그아웃 하셨습니다.`);
        }}
      />
    </div>
  );
};

export default Login;
