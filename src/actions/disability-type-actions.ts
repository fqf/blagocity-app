import blagocityApi from "@/api/blagocity-api";
import TGetDisabilityTypesListResponse from "@/models/contracts/disability-type/get-disability-types-list-response";

export const getDisabilityTypesList = async () => {
  return await blagocityApi().get<TGetDisabilityTypesListResponse>("/disability_types").json();
};
