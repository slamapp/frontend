import { Reducer } from "react";
import { actionTypes, ActionTypeUnion } from "./actionTypes";
import { Follow } from "./types";

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

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};

export const initialData = {
  currentUser: {
    userId: null,
    email: null,
    profileImageUrl: null,
    skill: null,
    role: null,
    position: null,
    description: null,
    nickname: null,
    followers: [],
    following: [],
    notifications: [],
  },
  isLoading: false,
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GET_CURRENT_USER: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          userId: payload.userId,
        },
      };
    }
    case actionTypes.CLEAR_CURRENT_USER: {
      return {
        ...prevState,
        ...initialData,
      };
    }
    case actionTypes.LOADING_ON: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: true,
      };
    }
    case actionTypes.LOADING_OFF: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: false,
      };
    }
    default: {
      return { ...prevState };
    }
  }
};
