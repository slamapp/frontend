import { IconToggle } from "@components/base";

interface Props {
  courtId: number;
}

const FavoritesToggle: React.FC<Props> = ({ courtId }) => {
  // const { favorites, handleToggleFavatories } = useUserContext();
  // TODO: context 함수로 변경
  // const handleToggleFavorites = useCallback(() => {}, []);

  return <IconToggle name="star" checked={true} onChange={() => {}} />;
};

export default FavoritesToggle;
