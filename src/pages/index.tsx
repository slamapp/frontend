import type { NextPage } from "next";
import Head from "next/head";
import { useNavigationContext } from "@contexts/hooks";
import { Favorites } from "@components/domain";
import { Button } from "@components/base";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  return (
    <div>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>

      <Button block size="lg">
        block 버튼
      </Button>
      <br />
      <Button block>block 버튼</Button>
      <br />
      <Button block size="sm">
        block 버튼
      </Button>
      <br />
      <div style={{ display: "flex", gap: 20 }}>
        <Button secondary block size="lg">
          secondary 버튼
        </Button>
        <Button secondary>secondary 버튼</Button>
        <Button secondary size="sm">
          secondary 버튼
        </Button>
      </div>
      <Favorites />
    </div>
  );
};

export default Home;
