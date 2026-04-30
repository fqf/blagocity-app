import blagocityApi from "@/api/blagocity-api";
import type TGetPlaceTypesListResponse from "@/models/contracts/place/getPlaceTypesListResponse";
import type TGetPlaceResponse from "@/models/contracts/place/getPlaceResponse";
import TCreatePlaceRequest from "@/models/contracts/place/createPlaceRequest";
import TGetPlacesListResponse from "@/models/contracts/place/getPlacesListResponse";

export const getPlaceTypesList = async () => {
  return await blagocityApi().get<TGetPlaceTypesListResponse>("/place_types").json();
};

export const getPlace = async (guid: string) => {
  return await blagocityApi().get<TGetPlaceResponse>(`/establishments/${guid}`).json();
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
