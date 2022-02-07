import { IconButton } from "@components/base";
import { withShareClick } from "@hocs/.";
import type { APICourt } from "@domainTypes/tobe";

interface ShareProps {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">;
}

const Share = ({ court }: ShareProps) =>
  withShareClick("court", { court })(IconButton.Share);

export default Share;
