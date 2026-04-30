import type TGetPlaceResponse from "@/models/contracts/place/getPlaceResponse";
import type { TGetReviewAccessibilityResponse } from "@/models/contracts/accessibility/getReviewAccessibilityListResponse";

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
