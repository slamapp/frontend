import { useNavigationContext } from "@contexts/hooks";
import type { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const UserChatroomPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_CHATROOM);

  return <div>User Chatroom Page</div>;
});

export default UserChatroomPage;
