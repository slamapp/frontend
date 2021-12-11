import React, { useEffect } from "react";
import { Spinner } from "@components/base";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { serviceApi } from "service";

const RedirectPage = () => {
  const router = useRouter();
  const { code: kakaoAuthCode } = router.query;

  const getServiceToken = async (kakaoAuthCode: string) => {
    try {
      const {
        data: { serviceToken },
      } = await serviceApi.getServiceToken({ kakaoAuthCode });

      // TODO: 서비스 토큰 로컬스토리지에 저장하기
      console.log(serviceToken);

      // 로그인 완료
      // router.replace("/");
    } catch (e) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (kakaoAuthCode) {
      console.log("hi");

      getServiceToken(router.query.code as string);
    }
  }, [kakaoAuthCode]);

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
