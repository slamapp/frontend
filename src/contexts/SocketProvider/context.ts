import { createContext } from "react";

export type SendFollow = (body: { receiverId: number }) => void;
export type SendFollowCancel = (body: { receiverId: number }) => void;

export interface ContextProps {
  sendFollow: SendFollow;
  sendFollowCancel: SendFollowCancel;
}

const initialContext = {
  sendFollow: () => {},
  sendFollowCancel: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
