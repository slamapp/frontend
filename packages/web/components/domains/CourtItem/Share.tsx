import { IconButton } from "~/components/uis"
import { withShareClick } from "~/hocs"
import type { APICourt } from "~/types/domains/objects"

interface ShareProps {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">
}

const Share = ({ court }: ShareProps) =>
  withShareClick("court", { court })(({ onClick }) => (
    <IconButton name="share-2" onClick={onClick} />
  ))

export default Share
