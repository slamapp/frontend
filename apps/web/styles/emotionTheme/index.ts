import colors from "./colors"
import gaps from "./gaps"
import sizes from "./sizes"

type ColorScheme = "white" | "black" | "kakao"
const scheme: {
  buttons: {
    [colorScheme in ColorScheme]: { color: string; backgroundColor: string }
  }
} = {
  buttons: {
    black: {
      color: colors.white,
      backgroundColor: colors.black,
    },
    white: {
      color: colors.black,
      backgroundColor: colors.white,
    },
    kakao: {
      color: colors.kakaoLoginBrown,
      backgroundColor: colors.kakaoYellow,
    },
  },
}

const emotionTheme = {
  colors,
  gaps,
  sizes,
  scheme,
} as const

export default emotionTheme

export type EmotionTheme = typeof emotionTheme
