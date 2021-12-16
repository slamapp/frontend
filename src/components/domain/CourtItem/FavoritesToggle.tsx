import { useCallback, useMemo } from "react";

import { IconToggle } from "@components/base";
import { useAuthContext } from "@contexts/hooks";

interface Props {
  courtId: number;
}

const FavoritesToggle: React.FC<Props> = ({ courtId }) => {
  const {
    authProps: {
      currentUser: { favorites },
    },
    createFavorite,
    deleteFavorite,
  } = useAuthContext();

  const { index, checked } = useMemo(() => {
    const index = favorites.findIndex(
      (favorite) => favorite.courtId === courtId
    );
    return {
      index,
      checked: index !== -1,
    };
  }, [favorites, courtId]);

  const handleToggleFavorite = useCallback(() => {
    if (checked) {
      deleteFavorite(favorites[index].favoriteId);
    } else {
      createFavorite(courtId);
    }
  }, [checked, courtId, index, favorites, deleteFavorite, createFavorite]);

  return (
    <IconToggle name="star" checked={checked} onChange={handleToggleFavorite} />
  );
};

export default FavoritesToggle;
