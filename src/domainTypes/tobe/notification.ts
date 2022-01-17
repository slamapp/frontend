import { NotificationType } from "@enums/.";
import type { APICommon, OmitAt } from "./common";
import type { APIFollow } from "./follow";
import type { APILoudspeaker } from "./loudspeaker";

export interface APINotification extends APICommon {
  type: NotificationType;
  follow?: OmitAt<APIFollow>;
  loudspeaker?: OmitAt<APILoudspeaker>;
  isRead: boolean;
  isClicked: boolean;
}
