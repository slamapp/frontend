import { Global, css } from "@emotion/react"

const GlobalCSS = () => {
  return (
    <Global
      styles={css`
        #__next {
          height: 100%;
        }

        /* 앱처럼 user-select 제거 */
        * {
          user-select: none;
        }

        /* iOS 15이하 대응 */
        input,
        textarea {
          user-select: auto;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: normal;
          font-size: 1em;
        }
        body {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
            Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
            "Noto Sans KR", "Malgun Gothic", sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }

        *:focus {
          -webkit-tap-highlight-color: transparent;
          outline: none;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
        }

        input,
        textarea,
        button,
        select,
        div,
        a {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      `}
    />
  )
}

export default GlobalCSS
