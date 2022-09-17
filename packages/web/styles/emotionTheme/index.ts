import colors from "./colors"
import gaps from "./gaps"
import previousTheme from "./previousTheme"
import sizes from "./sizes"

const emotionTheme = {
  colors,
  gaps,
  sizes,
  previousTheme,
} as const

export default emotionTheme

export type EmotionTheme = typeof emotionTheme
