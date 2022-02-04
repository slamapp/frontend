import { IconButton } from "@components/base";
import ShareBinder from "@hocs/ShareBinder";
import type { APICourt } from "@domainTypes/tobe";
import ChatLink from "./ChatLink";
import FavoritesToggle from "./FavoritesToggle";
import KakaoMapLink from "./KakaoMapLink";
import Header from "./Header";
import Address from "./Address";
import Datetime from "./Datetime";

const Share = (props: {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">;
}) => (
  <ShareBinder
    type="court"
    court={props.court}
    bind={(handler) => <IconButton.Share onClick={handler} />}
  />
);

const CourtItem = {
  FavoritesToggle,
  ChatLink,
  Share,
  KakaoMapLink,
  Header,
  Address,
  Datetime,
};

export default CourtItem;
