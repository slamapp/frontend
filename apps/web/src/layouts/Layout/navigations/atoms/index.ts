import type { FC } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const navigationState = atom<{
  top?: {
    title?: string
    isBack?: boolean
    isNotification?: boolean
    isMenu?: boolean
    isProfile?: boolean
    Custom?: FC
  } | null
  bottom?: boolean
}>({
  key: 'navigation',
  default: { top: null, bottom: undefined },
})

const useNavigation = () => useRecoilState(navigationState)
const useNavigationValue = () => useRecoilValue(navigationState)
const useSetNavigation = () => {
  const set = useSetRecoilState(navigationState)

  return {
    all: set,
    title: (title: string) =>
      set((prev) => ({
        ...prev,
        top: { ...prev.top, title },
      })),
    custom: (Custom: FC) =>
      set((prev) => ({
        ...prev,
        top: { ...prev.top, Custom },
      })),
  }
}

export { useNavigation, useNavigationValue, useSetNavigation }
