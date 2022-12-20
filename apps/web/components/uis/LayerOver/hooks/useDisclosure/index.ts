import { useState } from "react"

type Options = {
  initialState?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const useDisclosure = (options: Options) => {
  const { initialState = false, onOpen, onClose } = options

  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const open = async () => {
    setIsOpen(true)

    return onOpen?.()
  }

  const close = async () => {
    setIsOpen(false)

    return onClose?.()
  }

  const toggle = () => (isOpen ? close() : open())

  return { isOpen, open, close, toggle }
}

export default useDisclosure
