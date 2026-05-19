import blagocityApi from "@/api/blagocity-api";
import type TGetRolesListResponse from "@/models/contracts/roles/get-roles-list-response";

export const getRolesList = async () => {
  return await blagocityApi().get<TGetRolesListResponse>("/roles").json();
};
