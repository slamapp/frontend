import { NextPage } from "next";
import React from "react";
import { useNavigationContext } from "@contexts/hooks";
import UtilRoute from "UtilRoute";

const ChatroomPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.CHATROOM);

  return <div>Chatroom Page</div>;
});

export default ChatroomPage;
