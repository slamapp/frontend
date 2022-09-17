import type { ReactNode } from "react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"
import { Modal } from "~/components/uis/templates"

interface Props {
  children: ReactNode
  visible: boolean
  onClose: () => void
}

const DefaultModal = ({ children, visible, onClose }: Props) => {
  return (
    <Modal
      maxWidth="90vw"
      backgroundColor="white"
      visible={visible}
      onClose={onClose}
    >
      {children}
    </Modal>
  )
}

const S = {
  Header: styled(Text)`
    padding: 40px 0;
    text-align: center;
  `,
  BottomButtonContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
}

DefaultModal.Header = S.Header
DefaultModal.BottomButtonContainer = S.BottomButtonContainer

export default DefaultModal
