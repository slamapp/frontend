import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

import ToastItem from "./ToastItem";
import { CreateToast } from "./types";

interface Toast {
  id: string;
  message: string;
  duration: number;
}

interface Props {
  bind: (createToast: CreateToast) => void;
}

const ToastManager = ({ bind }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback((message, duration) => {
    const newToast = {
      id: v4(),
      message,
      duration,
    };
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          message={message}
          duration={duration}
          key={id}
          onDone={() => removeToast(id)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1500;
`;

export default ToastManager;
