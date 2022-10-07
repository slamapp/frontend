import colors from "./colors"
import gaps from "./gaps"
import sizes from "./sizes"

const emotionTheme = {
  colors,
  gaps,
  sizes,
  previousTheme: {
    iconSize: {
      sm: "20px",
      md: "24px",
      lg: "28px",
    },
    avatarSizes: {
      sm: "26px",
      md: "32px",
      lg: "50px",
    },
    buttonHeights: {
      sm: "27px",
      md: "38px",
      lg: "42px",
    },
    fontSizes: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      md: "18px",
      lg: "22px",
      xl: "48px",
    },
    borderRadiuses: {
      sm: "10px",
      md: "12px",
      lg: "16px",
    },
  },
} as const

export default emotionTheme

export type EmotionTheme = typeof emotionTheme
