import { APICourt } from "@domainTypes/tobe/court";
import { APIFavorite } from "@domainTypes/tobe/favorite";
import { APINotification } from "@domainTypes/tobe/notification";
import { APIUser } from "@domainTypes/tobe/user";
import { createContext } from "react";
import { DataProps } from "./reducer";

export interface ContextProps {
  authProps: DataProps;

  setCurrentUser: (data: {
    user: APIUser;
    notifications: APINotification[];
  }) => void;
  getCurrentUser: () => Promise<void>;
  logout: () => void;
  updateMyProfile: (
    editedUserProfile: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) => Promise<void>;
  updateMyProfileImage: (editedProfileImageFile: File) => Promise<void>;
  deleteMyProfileImage: () => Promise<void>;
  createFavorite: (courtId: APICourt["id"]) => Promise<void>;
  deleteFavorite: (favoriteId: APIFavorite["id"]) => Promise<void>;
  unshiftNotification: (notification: APINotification) => void;
  getMyFavorites: () => Promise<void>;
  getMyReservations: () => Promise<void>;
  readAllNotifications: () => Promise<void>;
  getMoreNotifications: () => Promise<void>;
  authProviderInit: () => Promise<void>;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
