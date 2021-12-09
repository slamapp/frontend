import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useNavigationContext } from "@contexts/NavigationProvider";

const User: NextPage = () => {
  const { useMountPage, changeNavigation } = useNavigationContext();
  useMountPage((page) => page.USER);

  const { asPath } = useRouter();
  const userId = asPath.split("/")[2];

  useEffect(() => {
    changeNavigation({
      title: `${userId}님의 프로필`,
    });
  }, [changeNavigation, userId]);

  return (
    <div>
      <Head>
        <title>{userId}님의 프로필 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>
      {userId}님의 프로필
    </div>
  );
};

export default User;
