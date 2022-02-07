import { useNavigationContext } from "@contexts/hooks";
import type { NextPage } from "next";
import React from "react";
import { withRouteGuard } from "@hocs/.";

const UserChatroomPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_CHATROOM);

  return <div>User Chatroom Page</div>;
};

export default withRouteGuard("private", UserChatroomPage);
