import type { ComponentProps } from "react"
import styled from "@emotion/styled"
import Sheet from "react-modal-sheet"

const ModalSheet = ({
  isOpen,
  onClose,
  children,
  onSnap,
  onCloseStart,
}: Pick<ComponentProps<typeof Sheet.Content>, "children"> &
  Pick<
    ComponentProps<typeof CustomSheet>,
    "isOpen" | "onClose" | "onSnap" | "onCloseStart"
  >) => {
  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[600 + 56, 270 + 56]}
      initialSnap={1}
      onSnap={onSnap}
      onCloseStart={onCloseStart}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
    </CustomSheet>
  )
}

export default ModalSheet

const CustomSheet = styled(Sheet)`
  z-index: 1000 !important;
  .react-modal-sheet-container {
    max-width: 640px;
    right: 0;
    margin: auto;
  }
`
