import type { APICommon, APICourt, APIUser, APIChat } from "@domainTypes/tobe";
import type { ChatroomAdminType, ChatroomType } from "@enums/.";

export interface APIChatroom extends APICommon<string> {
  admins: Admin[];
  type: ChatroomType;
  court?: APICourt;
  participants: APIUser[];
  lastChat: APIChat;
}

interface Admin {
  id: APIUser["id"];
  type: ChatroomAdminType;
}
