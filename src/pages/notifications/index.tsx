import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext, useSocketContext } from "@contexts/hooks";
import { NotificationList } from "@components/domain";

const NotificationsPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  const { sendObject, sendFollow, sendFollowCancel } = useSocketContext();

  useMountPage((page) => page.NOTIFICATIONS);

  const handleClickObject = () => {
    sendObject({ userId: 1 });
  };
  const handleClickFollow = () => {
    sendFollow({ receiverId: 1 });
  };
  const handleClickFollowCancel = () => {
    sendFollowCancel({ receiverId: 1 });
  };

  return (
    <div>
      NotificationsPage
      <button onClick={handleClickObject}>send to object</button>
      <button onClick={handleClickFollow}>follow</button>
      <button onClick={handleClickFollowCancel}>followCancel</button>
      <NotificationList />
    </div>
  );
});

export default NotificationsPage;
