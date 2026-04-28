import blagocityApi from "@/api/blagocity-api";
import type TGetRolesListResponse from "@/models/contracts/roles/getRolesListResponse";

export const getRolesList = async () => {
  return await blagocityApi().get<TGetRolesListResponse>("/roles").json();
};
