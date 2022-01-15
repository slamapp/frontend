import type { OmitAt, SenderObject } from "./common";
import type { User } from "./users";

export interface Follow extends SenderObject {
  receiver: OmitAt<User>;
}
