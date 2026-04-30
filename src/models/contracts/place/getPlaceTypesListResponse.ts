export type TGetPlaceTypeResponse = {
  guid: string;
  code: string;
  name: string;
  sortOrder: number;
};
type TGetPlaceTypesListResponse = TGetPlaceTypeResponse[];

export default TGetPlaceTypesListResponse;
