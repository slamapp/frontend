import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";
import React from "react";

const Activity: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ACTIVITY);

  return <div>Activity</div>;
};

export default Activity;
