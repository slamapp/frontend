import { Reducer } from "react";
import { pageType } from "./actionTypes";
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
        title: "",
      };
    }
    case pageType.BOOK: {
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
    case pageType.ACTIVITIES: {
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
    case pageType.LOGIN: {
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
    default: {
      return { ...state };
    }
  }
};
