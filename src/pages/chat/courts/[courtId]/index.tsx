import { useNavigationContext } from "@contexts/hooks";
import type { NextPage } from "next";
import React from "react";
import { utilRoute } from "@hocs/.";

const CourtChatroomPage: NextPage = utilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.COURT_CHATROOM);

  return <div>Court Chatroom Page</div>;
});

export default CourtChatroomPage;
