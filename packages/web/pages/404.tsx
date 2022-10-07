import styled from "@emotion/styled"
import { ErrorMessage } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"

export default function Custom404() {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_ERROR")

  return (
    <PageContainer>
      <ErrorMessage title="원하시는 페이지를 찾을 수 없어요 🤔" />
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
