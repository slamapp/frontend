import { Reducer } from "react";
import { actionTypes } from "./actionTypes";
import { ReducerAction, DataProps } from "./types";

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
