import type { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";

const FollowerPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_FOLLOWER);

  return <div>Follower Page</div>;
});

export default FollowerPage;
