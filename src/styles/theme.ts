const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    active_gradient_color:
      "linear-gradient(to right, #FFA5A5, #FFF4BD, #CCD1FF, #B2FFD6)",
    green: {
      strong: "#1AB74F",
      middle: "#2FCE64",
      light: "#6BE594",
    },
    gray50: "#FAF9F7",
    gray100: "#F3F1EF",
    gray200: "#EDEBE7",
    gray300: "#FE2E0DD",
    gray400: "#D0CCC7",
    gray500: "#AAA69F",
    gray600: "#86827C",
    gray700: "#4C4944",
    gray800: "#35332F",
    gray900: "#262625",
    red: {
      strong: "#F03939",
      middle: "#FF5353",
      light: "#FF7E7E",
    },
    blue: {
      strong: "#1A4EB7",
      middle: "#2F64CE",
      light: "#6B94E5",
    },
    logo: {
      green: "#4E5B00",
    },
    courtState: {
      lack: "rgba(0, 0, 0 / 20%)",
      able: "#000000",
      tooMuch: "#FF3270",
    },
    slam: {
      orange: {
        strong: "#FE6D04",
        middle: "#FF9900",
      },
    },
  },
  iconSize: "24px",
  avatarSizes: {
    sm: "26px",
    md: "32px",
    lg: "50px",
  },
  iconButtonPadding: "13px",
  buttonPaddings: {
    sm: "6px 16px",
    md: "10px 20px",
    lg: "15px 20px",
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
  gaps: {
    xxs: "4px",
    xs: "8px",
    sm: "16px",
    base: "20px",
    md: "24px",
    lg: "32px",
    xl: "40px",
    xxl: "48px",
  },
  boxShadows: {
    sm: "rgb(0 0 0 / 10%) 0px 12px 12px -12px",
    md: "rgb(0 0 0 / 25%) 0px 16px 0px 0px",
    lg: "rgb(0 0 0 / 20%) 0px 30px 0px 0px",
  },
} as const;

export default theme;

export type ITheme = typeof theme;