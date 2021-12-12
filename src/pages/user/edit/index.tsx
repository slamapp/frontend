import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const UserEditPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_EDIT);

  return <div>UserEditPage</div>;
});

export default UserEditPage;
