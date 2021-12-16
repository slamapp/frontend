import React from "react";
import { Notification } from "@contexts/AuthProvider/types";
import styled from "@emotion/styled";

interface Props {
  notification: Notification;
}

const getNotificationType = ({ type }: Notification) => {
  switch (type) {
    case "FOLLOW":
      return <>{type}</>;
      break;

    case "LOUD_SPEAKER":
      return <>{type}</>;
      break;

    default:
      break;
  }
};

const NotificationItem = ({ notification }: Props) => {
  return <div>{getNotificationType(notification)}</div>;
};

export default NotificationItem;

const ListItem = styled.li``;
