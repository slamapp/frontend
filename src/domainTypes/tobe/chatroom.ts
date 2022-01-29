import { ChatroomAdminType, ChatroomType } from "@enums/.";
import type { APIChat } from "./chat";
import type { APICommon } from "./common";
import type { APICourt } from "./court";
import type { APIUser } from "./user";

export interface APIChatroom extends APICommon<string> {
  admins: Admin[];
  type: ChatroomType;
  court?: APICourt;
  participants: APIUser[];
  lastChat: APIChat;
}

interface Admin {
  id: Pick<APIUser, "id">;
  type: ChatroomAdminType;
}
