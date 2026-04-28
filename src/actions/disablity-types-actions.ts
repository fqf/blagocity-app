import blagocityApi from "@/api/blagocity-api";
import TGetDisabilityTypesListResponse from "@/models/contracts/disabilityTypes/getDisabilityTypesListResponse";

export const getDisabilityTypesList = async () => {
  return await blagocityApi().get<TGetDisabilityTypesListResponse>("/disability_types").json();
};
