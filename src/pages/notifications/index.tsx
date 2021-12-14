import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";

const NotificationsPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.NOTIFICATIONS);

  return <div>NotificationsPage</div>;
});

export default NotificationsPage;
