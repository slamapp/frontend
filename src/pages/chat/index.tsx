import type { NextPage } from "next";
import React from "react";
import { useNavigationContext } from "@contexts/hooks";
import UtilRoute from "UtilRoute";

const ChatroomListPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.CHATROOM);

  return <div>Chatroom List Page</div>;
});

export default ChatroomListPage;
