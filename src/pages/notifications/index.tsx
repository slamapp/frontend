import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext, useSocketContext } from "@contexts/hooks";
import styled from "@emotion/styled";
import NotificationList from "@components/domain/NotificationList";

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
    <PageConainer>
      <button onClick={handleClickObject}>send to object</button>
      <button onClick={handleClickFollow}>follow</button>
      <button onClick={handleClickFollowCancel}>followCancel</button>
      <NotificationList />
      <IntersectionObserverContainer />
    </PageConainer>
  );
});

export default NotificationsPage;

const PageConainer = styled.div`
  flex: 1;
`;

const IntersectionObserverContainer = styled.div`
  height: 100px;
  background: red;
`;
