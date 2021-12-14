import type { NextPage } from "next";
import Head from "next/head";
import { useNavigationContext } from "@contexts/hooks";
import { Favorites } from "@components/domain";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  return (
    <div>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <Favorites />
    </div>
  );
};

export default Home;
