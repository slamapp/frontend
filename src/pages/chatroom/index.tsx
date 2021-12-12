import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const ChatroomListPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.CHATROOM);

  return <div>Chatroom List Page</div>;
});

export default ChatroomListPage;
