import type { NextPage } from "next";
import Head from "next/head";
import { useNavigationContext } from "@contexts/hooks";
import { Favorites } from "@components/domain";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  return (
    <div>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>

      <Container>
        <Favorites />
      </Container>
    </div>
  );
};

export default Home;

const Container = styled.div`
  margin: ${({ theme }) => theme.gaps.base};
`;
