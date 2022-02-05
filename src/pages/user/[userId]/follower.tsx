import type { NextPage } from "next";
import React from "react";
import { utilRoute } from "@hocs/.";
import { useNavigationContext } from "@contexts/hooks";

const FollowerPage: NextPage = utilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_FOLLOWER);

  return <div>Follower Page</div>;
});

export default FollowerPage;
