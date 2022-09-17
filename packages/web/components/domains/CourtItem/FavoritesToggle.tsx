import { useCallback } from "react"
import { Icon } from "~/components/uis/atoms"
import { useAuthContext } from "~/contexts/hooks"
import type { APICourt } from "~/types/domains"

interface Props {
  courtId: APICourt["id"]
}

const FavoritesToggle: React.FC<Props> = ({ courtId }) => {
  const { authProps, createFavorite, deleteFavorite } = useAuthContext()

  const isChecked = authProps.favorites.some(
    ({ court }) => court.id === courtId
  )

  const handleToggleFavorite = useCallback(() => {
    if (isChecked) {
      const deletingFavorite = authProps.favorites.find(
        ({ court }) => court.id === courtId
      )
      if (deletingFavorite) {
        deleteFavorite(deletingFavorite.id)
      }
    } else {
      createFavorite(courtId)
    }
  }, [isChecked, courtId, createFavorite, deleteFavorite, authProps.favorites])

  if (!authProps.currentUser) {
    return null
  }

  return (
    <Icon.Toggle
      name="star"
      checked={isChecked}
      onChange={handleToggleFavorite}
    />
  )
}

export default FavoritesToggle
