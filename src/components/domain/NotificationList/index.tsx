import { useAuthContext } from "@contexts/hooks";
import styled from "@emotion/styled";
import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const { authProps } = useAuthContext();
  const { notifications } = authProps.currentUser;

  return (
    <NotificationListContainer>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.createdAt}
          notification={notification}
        />
      ))}
    </NotificationListContainer>
  );
};

export default NotificationList;

const NotificationListContainer = styled.div`
  height: 100%;
  background: orange;
`;
