import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";

const FollowingPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_FOLLOWING);

  const { query } = useRouter();

  console.log(query);

  return <div>Following Page</div>;
});

export default FollowingPage;
