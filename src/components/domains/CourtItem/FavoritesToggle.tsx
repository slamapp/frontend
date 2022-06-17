import { useCallback } from "react"
import { Icon } from "~/components/uis/atoms"
import { useAuthContext } from "~/contexts/hooks"
import type { APICourt } from "~/domainTypes/tobe"

interface Props {
  courtId: APICourt["id"]
}

const FavoritesToggle: React.FC<Props> = ({ courtId }) => {
  const {
    authProps: {
      currentUser: { favorites },
    },
    createFavorite,
    deleteFavorite,
  } = useAuthContext()

  const isChecked = favorites.some(({ court }) => court.id === courtId)

  const handleToggleFavorite = useCallback(() => {
    if (isChecked) {
      const deletingFavorite = favorites.find(
        ({ court }) => court.id === courtId
      )
      if (deletingFavorite) {
        deleteFavorite(deletingFavorite.id)
      }
    } else {
      createFavorite(courtId)
    }
  }, [isChecked, courtId, createFavorite, deleteFavorite, favorites])

  return (
    <Icon.Toggle
      name="star"
      checked={isChecked}
      onChange={handleToggleFavorite}
    />
  )
}

export default FavoritesToggle
