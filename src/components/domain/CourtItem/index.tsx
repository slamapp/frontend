import { IconButton } from "@components/base";
import ClickShareMaker from "@hocs/ClickShareMaker";
import type { APICourt } from "@domainTypes/tobe";
import ChatLink from "./ChatLink";
import FavoritesToggle from "./FavoritesToggle";
import KakaoMapLink from "./KakaoMapLink";
import Header from "./Header";
import Address from "./Address";
import Datetime from "./Datetime";

const CourtItem = {
  FavoritesToggle,
  ChatLink,
  Share: ({
    court,
  }: {
    court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">;
  }) => ClickShareMaker({ type: "court", court }, IconButton.Share),
  KakaoMapLink,
  Header,
  Address,
  Datetime,
};

export default CourtItem;
