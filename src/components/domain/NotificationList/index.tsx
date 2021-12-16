import { useAuthContext } from "@contexts/hooks";
import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const { authProps } = useAuthContext();
  const { notifications } = authProps.currentUser;

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.notificationId}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default NotificationList;
