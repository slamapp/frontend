import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const FollowerPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_FOLLOWER);

  return <div>Follower Page</div>;
});

export default FollowerPage;
