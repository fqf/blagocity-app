import blagocityApi from "@/api/blagocity-api";
import type TCreateMediaRequest from "@/models/contracts/media/create-media-request";
import type TGetMediaResponse from "@/models/contracts/media/get-media-response";

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
