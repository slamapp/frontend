import type { APICommon, APICourt } from "~/domainTypes/tobe";

export interface APIFavorite extends APICommon {
  court: APICourt;
}
