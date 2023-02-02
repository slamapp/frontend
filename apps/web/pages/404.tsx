import styled from "@emotion/styled"
import { ErrorMessage } from "~/components/domains"

export default function Custom404() {
  return (
    <PageContainer>
      <ErrorMessage title="원하시는 페이지를 찾을 수 없어요 🤔" />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme }) => theme.gaps.base};
`
