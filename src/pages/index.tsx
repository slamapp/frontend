import type { NextPage } from "next";
import Head from "next/head";
import Button from "@components/Button";
import { useNavigationContext } from "@contexts/NavigationProvider";
import Link from "next/link";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  return (
    <div>
      <Head>
        <title>즐겨찾기 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <h1>홈 페이지</h1>
      <Link href="/court/create">새 농구장 추가</Link>
      <Button>Click Me!</Button>
    </div>
  );
};

export default Home;
