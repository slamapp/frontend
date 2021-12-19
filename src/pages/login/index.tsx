import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";
import { useRouter } from "next/router";
import { BottomFixedButton, Logo } from "@components/domain";
import styled from "@emotion/styled";
import { Header, Spacer } from "@components/base";

const Login: NextPage = UtilRoute("prevented", () => {
  const router = useRouter();
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.LOGIN);

  const endpoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string;
  const kakaoUrl = `${endpoint}/oauth2/authorization/kakao?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

  const handleClickLogin = () => {
    router.replace(kakaoUrl);
  };

  return (
    <PageContainer>
      <Head>
        <title>로그인 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <Spacer gap={6} type="vertical" style={{ alignItems: "center" }}>
        <Logo width={160} />
        <DescriptionText>같이 농구할 사람이 없다고?</DescriptionText>
      </Spacer>

      <KaKaoLoginButton onClick={handleClickLogin}>
        카카오 로그인
      </KaKaoLoginButton>
    </PageContainer>
  );
});

export default Login;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const DescriptionText = styled.span`
  font-size: 16;
  font-weight: 900;
`;

const KaKaoLoginButton = styled(BottomFixedButton)`
  background-color: ${({ theme }) => theme.colors.kakao.yellow.strong};
  color: ${({ theme }) => theme.colors.kakao.brown.strong};
`;
