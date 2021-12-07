import { actionTypes } from "./actionTypes";

export type ActionType = typeof actionTypes;
export type ActionTypeUnion = ActionType[keyof ActionType];

export type Follow = {
  followId: number;
  followerId: number;
  followingId: number;
};

export type Notification = {
  notificationId: number;
  courtId: number;
  userId: number;
  content: string;
  notificationType: string;
};

export interface DataProps {
  currentUser: {
    userId: number | null;
    email: string | null;
    profileImageUrl: string | null;
    skill: string | null;
    role: string | null;
    position: string | null;
    description: string | null;
    nickname: string | null;
    followers: Follow[];
    following: Follow[];
    notifications: Notification[];
  };
  isLoading: boolean;
}

export interface ContextProps {
  authProps: DataProps;
}

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};
