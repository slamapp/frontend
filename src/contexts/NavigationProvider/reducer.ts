import { Reducer } from "react";

import {
  ActionTypeUnion,
  navigationType,
  pageType,
  PageTypeUnion,
  eventType,
} from "./actionTypes";

export interface DataProps {
  isTopNavigation: boolean;
  isBottomNavigation: boolean;
  currentPage: PageTypeUnion;
  isBack: boolean;
  isNotifications: boolean;
  isProfile: boolean;
  isMenu: boolean;
  title: string;
  handleClickBack: null | (() => void);
  customButton: null | {
    title: string;
    handleClick: () => void;
  };
}

export const initialData = {
  isTopNavigation: true,
  isBottomNavigation: true,
  currentPage: pageType.NONE,
  isBack: true,
  isNotifications: true,
  isProfile: true,
  isMenu: false,
  title: "커스텀",
  handleClickBack: null,
  customButton: null,
};

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case pageType.NONE: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "",
      };
    }
    case pageType.FAVORITES: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "",
      };
    }
    case pageType.MAP: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "농구장 탐색",
      };
    }
    case pageType.RESERVATIONS: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "예약 목록",
      };
    }
    case pageType.ACTIVITY: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "활동",
      };
    }
    case pageType.LOGIN: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "로그인",
      };
    }
    case pageType.COURT_CREATE: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: true,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "새 농구장 추가",
      };
    }
    case pageType.USER: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isMenu: true,
        title: "",
      };
    }
    case pageType.USER_EDIT: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: false,
        title: "프로필 편집",
      };
    }
    case pageType.USER_MENU: {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "사용자 메뉴",
      };
    }
    case navigationType.CHANGE_NAVIGATION: {
      return {
        ...prevState,
        ...payload,
      };
    }
    case eventType.BIND: {
      return {
        ...prevState,
        back: payload.back,
        customButton: payload.customButton,
      };
    }
    case eventType.BIND_CUSTOM_BUTTON: {
      return {
        ...prevState,
        customButton: {
          title: payload.title,
          handleClick: payload.handleClick,
        },
      };
    }
    case eventType.CLEAR: {
      return {
        ...prevState,
        handleClickBack: null,
        customButton: null,
      };
    }
    default: {
      return { ...prevState };
    }
  }
};
