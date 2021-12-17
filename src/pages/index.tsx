import type { NextPage } from "next";
import Head from "next/head";
import { useNavigationContext } from "@contexts/hooks";
import { Favorites } from "@components/domain";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  return (
    <PageContainer>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <Favorites />
    </PageContainer>
  );
};

export default Home;

const PageContainer = styled.div`
  flex: 1;
  margin: ${({ theme }) => theme.gaps.base};
`;
