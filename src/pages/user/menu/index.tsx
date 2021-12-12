import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";

const Menu: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_MENU);

  return <div>Menu</div>;
});

export default Menu;
