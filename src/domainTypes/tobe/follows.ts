import { CommonObject } from "./common";
import { User } from "./users";

export interface Follow extends CommonObject {
  creator: User;
  receiver: User;
}
