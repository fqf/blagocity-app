import type TGetPlaceResponse from "@/models/contracts/place/get-place-response";
import type { TGetReviewAccessibilityResponse } from "@/models/contracts/accessibility/get-review-accessibility-list-response";

type TGetReviewResponse = {
  guid: string;
  establishment: TGetPlaceResponse;
  author: string;
  rating: number;
  text: string;
  isActive: boolean;
  reviewedAt: string;
  photos: string[];
  accessibilityCriteria: Exclude<TGetReviewAccessibilityResponse, "review">[];
};

export default TGetReviewResponse;
