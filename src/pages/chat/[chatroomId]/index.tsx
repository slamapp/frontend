import type { NextPage } from "next";
import { withRouteGuard } from "@hocs/.";
import React from "react";

const ChatroomPage: NextPage = withRouteGuard("private", () => {
  return <div>Chatroom Page</div>;
});

export default ChatroomPage;
