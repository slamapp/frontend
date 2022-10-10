import { css } from "@emotion/react"
import NavIcon from "./NavIcon"

const BottomNavigation = () => {
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

export default BottomNavigation
