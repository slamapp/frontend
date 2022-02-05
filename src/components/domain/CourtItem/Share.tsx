import { IconButton } from "@components/base";
import shareClickBinder from "@hocs/shareClickBinder";
import type { APICourt } from "@domainTypes/tobe";

interface ShareProps {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">;
}

const Share = ({ court }: ShareProps) =>
  shareClickBinder("court", { court })(IconButton.Share);

export default Share;
