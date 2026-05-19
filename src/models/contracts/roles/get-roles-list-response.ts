export type TRole = {
  guid: string;
  name: string;
  description: string;
  users: string[];
};
type TGetRolesListResponse = TRole[];

export default TGetRolesListResponse;
