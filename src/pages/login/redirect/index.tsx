import React, { useCallback, useEffect, useState } from "react";
import { Header, Spinner } from "@components/base";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "@contexts/AuthProvider";
import { useLocalToken } from "@hooks/domain";

const RedirectPage = () => {
  const [isNeedReLogin, setIsNeedReLogin] = useState(false);
  const [_, setToken] = useLocalToken();
  const { getCurrentUser } = useAuthContext();
  const { query } = useRouter();
  const { token } = query;

  const getCurrentUserData = useCallback(async () => {
    setToken(token);
    try {
      await getCurrentUser();
    } catch (error) {
      console.error(error);
      setIsNeedReLogin(true);
    }
  }, [token, getCurrentUser, setToken]);

  useEffect(() => {
    if (token) getCurrentUserData();
  }, [token, getCurrentUserData]);

  const NeedReLoginMarkUp = () => {
    return (
      <div>
        <Header>유효한 접근이 아닙니다.</Header>
        <Link href="/login" passHref>
          <a>
            <button>다시 로그인하러 가기</button>
          </a>
        </Link>
      </div>
    );
  };

  return (
    <PageContainer>
      {isNeedReLogin ? <NeedReLoginMarkUp /> : <Spinner />}
    </PageContainer>
  );
};

export default RedirectPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
