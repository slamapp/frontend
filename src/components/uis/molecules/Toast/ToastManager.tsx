import { useCallback, useEffect, useState } from "react"
import { ThemeProvider } from "@emotion/react"
import { v4 } from "uuid"
import emotionTheme from "~/styles/emotionTheme"
import ToastItem from "./ToastItem"
import type { CreateToast } from "./types"

interface Toast {
  id: string
  message: string
  duration: number
}

interface Props {
  bind: (createToast: CreateToast) => void
}

const ToastManager = ({ bind }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    bind((message, duration) => {
      const newToast = {
        id: v4(),
        message,
        duration,
      }
      setToasts((oldToasts) => [...oldToasts, newToast])
    })
  }, [bind])

  return (
    <ThemeProvider theme={emotionTheme}>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          message={message}
          duration={duration}
          key={id}
          onDone={() => removeToast(id)}
        />
      ))}
    </ThemeProvider>
  )
}

export default ToastManager
