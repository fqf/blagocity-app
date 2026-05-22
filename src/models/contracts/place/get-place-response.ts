import TGetReviewResponse from "@/models/contracts/review/get-review-response";
import { TGetPlaceTypeResponse } from "@/models/contracts/place/get-place-types-list-response";
import { TGetAccessibilityResponse } from "@/models/contracts/accessibility/get-accessibility-list-response";

type TGetPlaceResponse = {
  guid: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeType: TGetPlaceTypeResponse;
  accessibilityCriteria: TGetAccessibilityResponse[];
  photos: string[];
  createdBy: string;
  ownerReviewTrackingEnabled: boolean;
  reviews: Exclude<TGetReviewResponse, "establishment">[];
};

export default TGetPlaceResponse;
