import styled from "@emotion/styled"
import { ErrorMessage } from "~/components/domains"

export default function Custom500() {
  return (
    <PageContainer>
      <ErrorMessage title="시스템 문제로 페이지를 표시할 수 없어요 😥" />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 ${({ theme }) => theme.gaps.base};
`
