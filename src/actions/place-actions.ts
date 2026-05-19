import blagocityApi from "@/api/blagocity-api";
import type TGetPlaceTypesListResponse from "@/models/contracts/place/get-place-types-list-response";
import TCreatePlaceRequest from "@/models/contracts/place/create-place-request";
import TGetPlacesListResponse from "@/models/contracts/place/get-places-list-response";

export const getPlaceTypesList = async () => {
  return await blagocityApi().get<TGetPlaceTypesListResponse>("/place_types").json();
};

export const getPlacesList = async () => {
  return await blagocityApi().get<TGetPlacesListResponse>("/establishments").json();
};

export const createPlace = async (token: string, request: TCreatePlaceRequest) => {
  return await blagocityApi(token)
    .post("/establishments", {
      json: request,
    })
    .json();
};
