import { useNavigationContext } from "@contexts/hooks";
import { NextPage } from "next";
import React from "react";

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ADMIN_NEWCOURTS);

  return <div>관리자용 새 농구장 리스트 페이지</div>;
};

export default NewCourtsPage;
