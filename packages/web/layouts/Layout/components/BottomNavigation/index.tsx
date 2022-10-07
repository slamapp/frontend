import { css } from "@emotion/react"
import { useAuthContext } from "~/contexts/hooks"
import NavIcon from "./NavIcon"

const BottomNavigation = () => {
  const { authProps } = useAuthContext()

  if (!authProps.currentUser) {
    return null
  }

  if (authProps.currentUser) {
    return (
      <nav
        css={css`
          position: sticky;
          background: white;
          display: flex;
          align-items: center;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          box-shadow: 0 -8px 32px -16px #00000020;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            margin: 0 16px;
            align-items: center;
            height: 52px;
            flex: 1;
          `}
        >
          <NavIcon.Favorites />
          <NavIcon.Map />
          <NavIcon.Chat />
          <NavIcon.Reservations />
        </div>
      </nav>
    )
  }

  return null
}

export default BottomNavigation
