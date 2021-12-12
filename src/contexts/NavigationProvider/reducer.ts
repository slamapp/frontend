import { Reducer } from "react";
import { navigationType, pageType } from "./actionTypes";
import { ReducerAction, DataProps } from "./types";

export const initialData = {
  isTopNavigation: true,
  isBottomNavigation: true,
  currentPage: pageType.NONE,
  isBack: true,
  handleClickBack: null,
  isNotifications: true,
  isProfile: true,
  isNext: false,
  handleClickNext: null,
  isMenu: false,
  title: "",
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  state,
  { type, payload }
) => {
  switch (type) {
    case pageType.NONE: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "",
      };
    }
    case pageType.FAVORITES: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "",
      };
    }
    case pageType.MAP: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "농구장 탐색",
      };
    }
    case pageType.RESERVATIONS: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "예약 목록",
      };
    }
    case pageType.ACTIVITY: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "활동",
      };
    }
    case pageType.LOGIN: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: false,
        title: "로그인",
      };
    }
    case pageType.COURT_CREATE: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: true,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "새 농구장 추가",
      };
    }
    case pageType.USER: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: true,
        title: "",
      };
    }
    case pageType.USER_MENU: {
      return {
        ...state,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: false,
        title: "사용자 메뉴",
      };
    }
    case navigationType.CHANGE_NAVIGATION: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
