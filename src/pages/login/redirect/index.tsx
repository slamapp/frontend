import { Spinner } from "@components/base";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

const RedirectPage = () => {
  const { query } = useRouter();

  console.log(query);
  console.log(query.code);

  return (
    <PageContainer>
      <Spinner />
    </PageContainer>
  );
};

export default RedirectPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
