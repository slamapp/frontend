import type { MouseEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Text, Button } from "~/components/uis/atoms"
import managementApi from "~/service/managementApi"
import type { APINewCourt } from "~/types/domains"

interface Props {
  newCourt: APINewCourt
  state: "READY" | "DONE"
  [x: string]: any
}
const NewCourtItem = ({
  newCourt,
  state,
  style,
  setIsOpenDenyModal,
  setIsOpenAcceptModal,
}: Props) => {
  const router = useRouter()

  const handleDeny = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await managementApi.denyNewCourt(newCourt.id)
      setIsOpenDenyModal(true)
      setTimeout(() => {
        setIsOpenDenyModal(false)
        router.reload()
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAccept = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await managementApi.acceptNewCourt(newCourt.id)
      setIsOpenAcceptModal(true)
      setTimeout(() => {
        setIsOpenAcceptModal(false)
        router.reload()
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Link href={`/admin/newcourts/${newCourt.id}`} passHref>
      <Container style={style}>
        <CourtName strong block>
          {newCourt.newCourt.name}
        </CourtName>
        {state === "READY" ? (
          <ButtonContainer>
            <Button fullWidth tertiary onClick={handleDeny}>
              거절하기
            </Button>
            <Button fullWidth onClick={handleAccept}>
              승인하기
            </Button>
          </ButtonContainer>
        ) : newCourt.newCourt.status === "ACCEPT" ? (
          <StatusBar fullWidth className="accept">
            승인됨
          </StatusBar>
        ) : (
          <StatusBar fullWidth className="deny">
            거절됨
          </StatusBar>
        )}
      </Container>
    </Link>
  )
}

export default NewCourtItem

const Container = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: ${theme.previousTheme.colors.white};
    border-radius: ${theme.previousTheme.borderRadiuses.md};
    box-shadow: ${theme.previousTheme.boxShadows.sm};
    padding: ${theme.previousTheme.gaps.base};
  `}
`

const StatusBar = styled(Button)`
  text-align: center;

  &.accept {
    background: ${({ theme }) => theme.previousTheme.colors.green.light};
  }

  &.deny {
    background: ${({ theme }) => theme.previousTheme.colors.red.light};
  }
`

const CourtName = styled(Text)`
  margin-bottom: ${({ theme }) => theme.previousTheme.gaps.sm};
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
