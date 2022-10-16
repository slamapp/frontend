import type { FC } from "react"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const navigationState = atom<Options>({
  key: "navigation",
  default: {},
})

type Options = {
  top?: {
    title?: string
    isBack?: boolean
    isNotification?: boolean
    isMenu?: boolean
    isProfile?: boolean
    Custom?: FC
  }
  bottom?: false
}

export const useNavigation = () => useRecoilState(navigationState)
export const useNavigationValue = () => useRecoilValue(navigationState)
export const useSetNavigation = () => {
  const set = useSetRecoilState(navigationState)

  return {
    all: set,
    title: (title: string) =>
      set((prev) => ({
        ...prev,
        top: { ...prev.top, title },
      })),
  }
}
