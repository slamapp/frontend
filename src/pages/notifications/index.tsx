import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";
import styled from "@emotion/styled";
import NotificationList from "@components/domain/NotificationList";

const NotificationsPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.NOTIFICATIONS);

  return (
    <PageConainer>
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
