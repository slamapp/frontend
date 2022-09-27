import { IconButton } from "~/components/uis/molecules"
import { withShareClick } from "~/hocs"
import type { APICourt } from "~/types/domains/objects"

interface ShareProps {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">
}

const Share = ({ court }: ShareProps) =>
  withShareClick("court", { court })(IconButton.Share)

export default Share
