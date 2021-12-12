import React, { useEffect, useState } from "react";
import { Header, Spinner } from "@components/base";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import useLocalStorage from "@hooks/useLocalStorage";
import { useAuthContext } from "@contexts/AuthProvider";

const RedirectPage = () => {
  const [isNeedReLogin, setIsNeedReLogin] = useState(false);
  const [_, setToken] = useLocalStorage("slam_token", "");
  const { getCurrentUser } = useAuthContext();
  const {
    query: { token: serviceToken },
  } = useRouter();

  const getUserDataByToken = async (serviceToken: string) => {
    setToken(serviceToken);
    try {
      await getCurrentUser(serviceToken);
    } catch (error) {
      console.error(error);
      setIsNeedReLogin(true);
    }
  };

  useEffect(() => {
    if (serviceToken) {
      getUserDataByToken(serviceToken as string);
    }
  }, [serviceToken]);

  const NeedReLoginMarkUp = () => {
    return (
      <div>
        <Header>유효한 접근이 아닙니다.</Header>
        <Link href="/login">
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
