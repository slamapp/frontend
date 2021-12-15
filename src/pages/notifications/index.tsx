import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";
import { useSocketContext } from "@contexts/SocketProvider";

const NotificationsPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  const { sendTestOn, sendChat, sendObject } = useSocketContext();
  useMountPage((page) => page.NOTIFICATIONS);

  const handleClickTestOn = () => {
    sendTestOn({ text: "testOn" });
  };
  const handleClickChat = () => {
    sendChat({ userId: 2 });
  };
  const handleClickObject = () => {
    sendObject({ userId: 1 });
  };

  return (
    <div>
      NotificationsPage
      <button onClick={handleClickTestOn}>send to test</button>
      <button onClick={handleClickChat}>send to chat</button>
      <button onClick={handleClickObject}>send to object</button>
    </div>
  );
});

export default NotificationsPage;
