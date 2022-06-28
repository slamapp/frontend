import React from "react"
import styled from "@emotion/styled"
import Lottie from "react-lottie"
import * as animationData from "../../../../public/assets/lottie/basketball.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

interface Props {
  width?: number
}

const Logo = ({ width = 82 }: Props) => {
  return (
    <LogoWrapper width={width}>
      <svg
        width="283"
        height="103"
        viewBox="0 0 283 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42.4898 101H0.568359V82.7264H42.4898C43.7439 82.7264 44.8188 82.2786 45.7145 81.3828C46.6103 80.487 47.0582 79.4121 47.0582 78.1581C47.0582 76.8592 46.6103 76.0083 45.7145 75.6052C44.8188 75.2021 43.7439 75.0005 42.4898 75.0005H23.4102C20.2302 75.0005 17.2518 74.3959 14.475 73.1866C11.6981 71.9773 9.2796 70.3426 7.21936 68.2823C5.15912 66.1773 3.52436 63.7364 2.31509 60.9595C1.1506 58.1827 0.568359 55.2043 0.568359 52.0243C0.568359 48.8444 1.1506 45.866 2.31509 43.0892C3.52436 40.3123 5.15912 37.8938 7.21936 35.8335C9.2796 33.7733 11.6981 32.1609 14.475 30.9964C17.2518 29.7872 20.2302 29.1825 23.4102 29.1825H60.5617V47.456H23.4102C22.1561 47.456 21.0812 47.9039 20.1855 48.7996C19.2897 49.6954 18.8418 50.7703 18.8418 52.0243C18.8418 53.3232 19.2897 54.4429 20.1855 55.3834C21.0812 56.2792 22.1561 56.7271 23.4102 56.7271H42.4898C45.625 56.7271 48.581 57.2645 51.3578 58.3394C54.1347 59.3696 56.5532 60.8252 58.6134 62.7063C60.6737 64.5873 62.3085 66.8491 63.5177 69.4916C64.727 72.1341 65.3316 75.0229 65.3316 78.1581C65.3316 81.338 64.727 84.3164 63.5177 87.0933C62.3085 89.8253 60.6737 92.2439 58.6134 94.3489C56.5532 96.4091 54.1347 98.0439 51.3578 99.2532C48.581 100.418 45.625 101 42.4898 101Z"
          fill="#35332F"
        />
        <path d="M93.6152 101H75.1402V0.428711H93.6152V101Z" fill="#35332F" />
        <path
          d="M177.324 101H172.89L165.768 91.1242C164.022 92.6917 162.163 94.1697 160.192 95.5582C158.266 96.9018 156.229 98.0887 154.079 99.1188C151.929 100.104 149.712 100.888 147.428 101.47C145.188 102.052 142.904 102.344 140.575 102.344C135.514 102.344 130.744 101.493 126.266 99.7906C121.832 98.0887 117.935 95.6253 114.576 92.4006C111.262 89.1311 108.642 85.145 106.716 80.4423C104.79 75.7395 103.827 70.3874 103.827 64.3858C103.827 58.7873 104.79 53.6591 106.716 49.0012C108.642 44.2984 111.262 40.2675 114.576 36.9084C117.935 33.5493 121.832 30.9517 126.266 29.1153C130.744 27.2343 135.514 26.2937 140.575 26.2937C142.904 26.2937 145.211 26.5848 147.495 27.1671C149.779 27.7493 151.996 28.5555 154.146 29.5856C156.296 30.6157 158.334 31.825 160.26 33.2134C162.23 34.6019 164.067 36.1023 165.768 37.7146L172.89 29.1825H177.324V101ZM158.849 64.3858C158.849 61.8777 158.356 59.4591 157.371 57.1302C156.43 54.7564 155.131 52.6738 153.474 50.8823C151.817 49.046 149.869 47.5904 147.629 46.5154C145.435 45.3957 143.083 44.8359 140.575 44.8359C138.067 44.8359 135.693 45.2614 133.454 46.1124C131.259 46.9633 129.334 48.2174 127.676 49.8745C126.064 51.5317 124.788 53.5919 123.847 56.0553C122.906 58.4738 122.436 61.2507 122.436 64.3858C122.436 67.521 122.906 70.3202 123.847 72.7835C124.788 75.2021 126.064 77.2399 127.676 78.8971C129.334 80.5542 131.259 81.8083 133.454 82.6593C135.693 83.5102 138.067 83.9357 140.575 83.9357C143.083 83.9357 145.435 83.3983 147.629 82.3233C149.869 81.2037 151.817 79.748 153.474 77.9565C155.131 76.1202 156.43 74.0376 157.371 71.7086C158.356 69.3349 158.849 66.8939 158.849 64.3858Z"
          fill="#35332F"
        />
        <path
          d="M282.866 101H264.593V55.3163C264.593 54.0622 264.347 52.8753 263.854 51.7556C263.406 50.6359 262.757 49.6506 261.906 48.7996C261.055 47.9487 260.069 47.2992 258.95 46.8513C257.83 46.3587 256.643 46.1124 255.389 46.1124C254.135 46.1124 252.948 46.3587 251.828 46.8513C250.753 47.2992 249.79 47.9487 248.94 48.7996C248.133 49.6506 247.484 50.6359 246.991 51.7556C246.543 52.8753 246.319 54.0622 246.319 55.3163V101H227.979V55.3163C227.979 54.0622 227.732 52.8753 227.24 51.7556C226.792 50.6359 226.143 49.6506 225.292 48.7996C224.441 47.9487 223.455 47.2992 222.336 46.8513C221.216 46.3587 220.029 46.1124 218.775 46.1124C217.521 46.1124 216.334 46.3587 215.214 46.8513C214.139 47.2992 213.176 47.9487 212.325 48.7996C211.519 49.6506 210.87 50.6359 210.377 51.7556C209.929 52.8753 209.705 54.0622 209.705 55.3163V101H191.365V29.0482H195.799L200.77 34.5571C203.323 32.4073 206.122 30.7501 209.168 29.5856C212.258 28.3763 215.461 27.7717 218.775 27.7717C222.134 27.7717 225.404 28.3987 228.583 29.6528C231.808 30.9069 234.63 33.0791 237.048 36.1694C238.168 34.6467 239.445 33.3478 240.878 32.2729C242.311 31.198 243.811 30.3246 245.379 29.6528C246.991 28.981 248.648 28.5107 250.35 28.242C252.052 27.9285 253.732 27.7717 255.389 27.7717C259.196 27.7717 262.757 28.4883 266.071 29.9215C269.43 31.3547 272.341 33.3254 274.805 35.8335C277.313 38.2969 279.283 41.2081 280.717 44.5672C282.15 47.9263 282.866 51.5093 282.866 55.3163V101Z"
          fill="#35332F"
        />
      </svg>
      <LottieWrapper width={width}>
        <Lottie
          options={defaultOptions}
          width={width * 0.16}
          style={{ marginBottom: -4 }}
        />
      </LottieWrapper>
    </LogoWrapper>
  )
}

export default Logo

const LogoWrapper = styled.span<{ width: number }>`
  width: ${({ width }) => width}px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const LottieWrapper = styled.div<{ width: number }>`
  margin-bottom: ${({ width }) => -width * 0.1}px;
`
