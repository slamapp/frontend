import { createContext } from "react";

export type SendFollow = (body: { receiverId: number }) => void;
export type SendFollowCancel = (body: { receiverId: number }) => void;
export type SendLoudSpeaker = (body: {
  courtId: number;
  startTime: string;
  reservationId: number;
}) => void;
export interface ContextProps {
  sendFollow: SendFollow;
  sendFollowCancel: SendFollowCancel;
  sendLoudSpeaker: SendLoudSpeaker;
}

export const Context = createContext<ContextProps>({} as ContextProps);
