import { useRouter } from "next/router";
import React from "react";

const RedirectPage = () => {
  const { query } = useRouter();

  console.log(query);
  console.log(query.code);

  return <div>Redirect</div>;
};

export default RedirectPage;
