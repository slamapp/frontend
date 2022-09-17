const previousTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    activeGradientColor: "linear-gradient(to right, #262625, #35332F)",
    green: {
      strong: "#1AB74F",
      middle: "#2FCE64",
      light: "#6BE594",
    },
    gray50: "#FAF9F7",
    gray100: "#F3F1EF",
    gray200: "#EDEBE7",
    gray300: "#E2E0DD",
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
    kakao: {
      yellow: {
        strong: "#F7E600",
        middle: "#FFF683",
      },
      brown: {
        strong: "#3A1D1D",
      },
    },
  },
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
  iconButtonPadding: "13px",
  chipPadding: "10px 16px",
  inputPadding: "15px 20px",
  buttonHeights: {
    sm: "27px",
    md: "38px",
    lg: "42px",
  },
  buttonRightLeftPaddings: {
    sm: "16px",
    md: "20px",
    lg: "20px",
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
    sm: "0px 12px 12px -12px rgb(0 0 0 / 10%)",
    md: "0px 16px 0px 0px rgb(0 0 0 / 25%)",
    lg: " 0px 0px 30px rgba(0, 0, 0, 0.2)",
  },
  filter: {
    dropShadow: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.15))",
  },
} as const

export default previousTheme
