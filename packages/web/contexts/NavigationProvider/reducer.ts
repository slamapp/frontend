import type { ReactNode, Reducer } from "react"
import type { Action, PageType } from "./actionTypes"

export interface DataProps {
  isTopNavigation: boolean
  isBottomNavigation: boolean
  currentPage: PageType
  isBack: boolean
  isNotifications: boolean
  isProfile: boolean
  isMenu: boolean
  title: ReactNode
  isTopNavShrink: boolean
  handleClickBack: null | (() => void)
  customButton: null | {
    title: ReactNode
    handleClick: () => void
  }
}

export const initialData: DataProps = {
  isTopNavigation: true,
  isBottomNavigation: true,
  currentPage: "PAGE_NONE",
  isBack: true,
  isNotifications: true,
  isProfile: true,
  isMenu: false,
  title: "",
  isTopNavShrink: false,
  handleClickBack: null,
  customButton: null,
}

export const reducer: Reducer<DataProps, Action> = (prevState, action) => {
  switch (action.type) {
    case "PAGE_NONE": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "",
      }
    }
    case "PAGE_FAVORITES": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "즐겨찾기",
      }
    }
    case "PAGE_NOTIFICATIONS": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "",
      }
    }
    case "PAGE_MAP": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "어디서 농구할까요?",
      }
    }
    case "PAGE_COURT_RESERVATIONS": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "년월일 넣기",
      }
    }
    case "PAGE_RESERVATIONS": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "예약",
      }
    }
    case "PAGE_RESERVATIONS_COURTS": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: true,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "",
      }
    }
    case "PAGE_ACTIVITY": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "활동",
      }
    }
    case "PAGE_LOGIN": {
      return {
        ...prevState,
        isTopNavigation: false,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "로그인",
      }
    }
    case "PAGE_COURT_CREATE": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: true,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "새 농구장 추가",
      }
    }
    case "PAGE_USER": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isMenu: true,
        title: "",
      }
    }
    case "PAGE_USER_EDIT": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: false,
        title: "프로필 편집",
      }
    }
    case "PAGE_CHATROOM_LIST": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: true,
        isProfile: true,
        isNext: false,
        isMenu: false,
        title: "채팅방",
      }
    }
    case "PAGE_ADMIN_NEWCOURTS": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: false,
        isNotifications: false,
        isProfile: false,
        isNext: false,
        isMenu: true,
        title: "새 농구장",
      }
    }
    case "PAGE_USER_MENU": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: false,
        currentPage: action.type,
        isBack: true,
        isNotifications: false,
        isProfile: false,
        isMenu: false,
        title: "메뉴",
      }
    }
    case "PAGE_ERROR": {
      return {
        ...prevState,
        isTopNavigation: true,
        isBottomNavigation: true,
        currentPage: action.type,
        isBack: true,
        isNotifications: true,
        isProfile: true,
        isMenu: false,
        title: "",
      }
    }
    case "NAVIGATION_SET_TITLE": {
      const { title } = action.payload

      return {
        ...prevState,
        title,
      }
    }
    case "SET_TOP_NAV_IS_SHRINK": {
      const { isShrink } = action.payload

      return {
        ...prevState,
        isTopNavShrink: isShrink,
      }
    }
    case "EVENT_BIND": {
      const { back, customButton } = action.payload.events

      return {
        ...prevState,
        back,
        customButton,
      }
    }
    case "EVENT_BIND_CUSTOM_BUTTON": {
      const { title, handleClick } = action.payload

      return {
        ...prevState,
        customButton: {
          title,
          handleClick,
        },
      }
    }
    case "EVENT_CLEAR": {
      return {
        ...prevState,
        handleClickBack: null,
        customButton: null,
      }
    }
    default: {
      return prevState
    }
  }
}
