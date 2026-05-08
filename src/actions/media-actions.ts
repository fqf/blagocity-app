import blagocityApi from "@/api/blagocity-api";
import type TCreateMediaRequest from "@/models/contracts/media/createMediaRequest";
import type TGetMediaResponse from "@/models/contracts/media/getMediaResponse";

export const createMedia = async (token: string, request: TCreateMediaRequest) => {
  return await blagocityApi(token)
    .post("/media", {
      json: request,
    })
    .json();
};

export const getMedia = async (guid: string) => {
  return await blagocityApi().get<TGetMediaResponse>(`/media/${guid}`).json();
};
