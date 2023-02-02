import { useState } from "react"
import { css } from "@emotion/react"
import { useTimeout } from "~/hooks"

type Props = {
  lazyLoadTime: number
}

const EssentialImagePreload = ({ lazyLoadTime = 5000 }: Props) => {
  const [isNeedToLoad, setIsNeedToLoad] = useState(false)

  useTimeout(() => {
    setIsNeedToLoad(true)
  }, lazyLoadTime)

  return isNeedToLoad ? (
    <div
      css={css`
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
      `}
    >
      {[
        "/assets/basketball/only_ball_500.png",
        "/assets/basketball/animation_off_400.png",
        "/assets/basketball/animation_off_favorited.png",
        "/assets/basketball/fire_off_400.gif",
        "/assets/basketball/fire_off_all_tagged.gif",
        "/assets/basketball/fire_off_favorited.gif",
        "/assets/basketball/fire_off_reservated.gif",
        "/assets/basketball/fire_on_400.gif",
        "/assets/basketball/fire_on_all_tagged.gif",
        "/assets/basketball/fire_on_favorited.gif",
        "/assets/basketball/fire_on_reservated.gif",
        "/assets/basketball/only_ball_500.gif",
      ].map((url) => (
        <img key={url} src={url} />
      ))}
    </div>
  ) : null
}

export default EssentialImagePreload
