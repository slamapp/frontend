import { NextPage } from "next";
import React, { useState } from "react";
import UtilRoute from "UtilRoute";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import styled from "@emotion/styled";
import { Button, Icon, Modal } from "@components/base";

const Menu: NextPage = UtilRoute("private", () => {
  const { logout } = useAuthContext();
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_MENU);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = [
    {
      id: "1",
      title: "다크 모드",
      onClick: () => console.log("dark Mode clicked"),
      icon: "moon",
    },
    {
      id: "2",
      title: "로그아웃",
      onClick: () => setIsModalOpen(true),
      icon: "log-out",
    },
  ] as const;

  const handleClickCancelLogout = () => {
    setIsModalOpen(false);
  };
  const handleClickConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };
  return (
    <div>
      <MenuList>
        {list.map(({ title, onClick, icon, id }) => (
          <MenuItem key={id} onClick={onClick}>
            <Icon name={icon} /> {title}
          </MenuItem>
        ))}
      </MenuList>
      <Modal
        maxWidth="90vw"
        backgroundColor="white"
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalQuestion>정말 로그아웃 하시나요? 🤔</ModalQuestion>
        <ModalBottomButtonContainer>
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
        </ModalBottomButtonContainer>
      </Modal>
    </div>
  );
});

export default Menu;

const MenuList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background 200ms;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
  &:focus {
    background: ${({ theme }) => theme.colors.gray200};
  }
  &:active {
    background: ${({ theme }) => theme.colors.gray300};
  }
`;

const ModalQuestion = styled.div`
  font-size: 16px;
  padding: 40px 0;
`;

const ModalBottomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
