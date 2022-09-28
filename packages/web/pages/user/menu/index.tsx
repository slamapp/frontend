import React, { useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { Modal } from "~/components/domains"
import { Icon, Button, Spacer } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

interface Props {
  buildTime: string
}

const Page = withRouteGuard(
  "private",
  ({ buildTime }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { logout } = useAuthContext()
    const { useMountPage } = useNavigationContext()
    useMountPage("PAGE_USER_MENU")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const list = [
      // {
      //   title: "다크 모드",
      //   onClick: () => console.log("dark Mode clicked"),
      //   icon: "moon",
      // },
      {
        title: "로그아웃",
        onClick: () => setIsModalOpen(true),
        icon: "log-out",
      },
    ] as const

    const handleClickCancelLogout = () => {
      setIsModalOpen(false)
    }
    const handleClickConfirmLogout = () => {
      logout()
      setIsModalOpen(false)
    }

    return (
      <Spacer
        type="vertical"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <MenuList>
          {list.map(({ title, onClick, icon }) => (
            <MenuItem key={title} onClick={onClick}>
              <Icon name={icon} /> {title}
            </MenuItem>
          ))}
        </MenuList>
        <div style={{ textAlign: "center" }}>
          {dayjs(buildTime).format(
            "빌드 버전: YYYY년 MM월 DD일 HH시 MM분 ss초"
          )}
        </div>
        <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header block>정말 로그아웃 하시나요? 🤔</Modal.Header>
          <Modal.BottomButtonContainer>
            <Button
              style={{ flex: 1 }}
              secondary
              size="lg"
              onClick={handleClickCancelLogout}
            >
              취소
            </Button>
            <Button
              style={{ flex: 1 }}
              size="lg"
              onClick={handleClickConfirmLogout}
            >
              로그아웃하기
            </Button>
          </Modal.BottomButtonContainer>
        </Modal>
      </Spacer>
    )
  }
)

export default Page

const MenuList = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.previousTheme.colors.gray100};
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background 200ms;
  border-bottom: 1px solid ${({ theme }) => theme.previousTheme.colors.gray50};

  &:hover {
    background: ${({ theme }) => theme.previousTheme.colors.gray100};
  }
  &:focus {
    background: ${({ theme }) => theme.previousTheme.colors.gray200};
  }
  &:active {
    background: ${({ theme }) => theme.previousTheme.colors.gray300};
  }
`

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      buildTime: new Date().toISOString(),
    },
  }
}
