import { useNavigationContext } from "@contexts/hooks";
import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const CourtChatroomPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.COURT_CHATROOM);

  return <div>Court Chatroom Page</div>;
});

export default CourtChatroomPage;
