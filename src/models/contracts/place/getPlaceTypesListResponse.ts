import { TGetAccessibilityResponse } from "@/models/contracts/accessibility/getAccessibilityListResponse";

export type TGetPlaceTypeResponse = {
  guid: string;
  code: string;
  name: string;
  sortOrder: number;
  criterionScores: TGetAccessibilityResponse[];
};
type TGetPlaceTypesListResponse = TGetPlaceTypeResponse[];

export default TGetPlaceTypesListResponse;
