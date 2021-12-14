import { NextPage } from "next";
import React from "react";
import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/hooks";

const Menu: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_MENU);

  return <div>Menu</div>;
});

export default Menu;
