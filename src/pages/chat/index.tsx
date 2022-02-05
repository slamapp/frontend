import type { NextPage } from "next";
import React from "react";
import { useNavigationContext } from "@contexts/hooks";
import { utilRoute } from "@hocs/.";

const ChatroomListPage: NextPage = utilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.CHATROOM);

  return <div>Chatroom List Page</div>;
});

export default ChatroomListPage;
