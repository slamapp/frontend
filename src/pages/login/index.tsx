import type { NextPage } from "next";
import Head from "next/head";
import { KakaoLogin } from "@components/domain";
import { useNavigationContext } from "@contexts/NavigationProvider";

const Login: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.LOGIN);

  return (
    <div>
      <Head>
        <title>로그인 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>
      <KakaoLogin
        token={process.env.NEXT_PUBLIC_KAKAO_LOGIN_KEY as string}
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
