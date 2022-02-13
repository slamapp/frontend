import { createContext } from "react";

export interface ContextProps {
  sendFollow: (body: { receiverId: number }) => void;
  sendFollowCancel: (body: { receiverId: number }) => void;
  sendLoudSpeaker: (body: {
    courtId: number;
    startTime: string;
    reservationId: number;
  }) => void;
}

export const Context = createContext<ContextProps>({} as ContextProps);
