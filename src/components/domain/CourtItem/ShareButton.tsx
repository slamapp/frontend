import { IconButton } from "@components/base";
import ShareButtonMaker from "../../../hoc/ShareButtonMaker";

const ShareButton = ShareButtonMaker("COURT", ({ handleClick }) => (
  <IconButton name="share-2" onClick={handleClick} />
));

export default ShareButton;
