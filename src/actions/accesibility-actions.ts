import blagocityApi from "@/api/blagocity-api";
import TGetAccessibilityListResponse from "@/models/contracts/accessibility/getAccessibilityListResponse";
import TGetReviewAccessibilityListResponse from "@/models/contracts/accessibility/getReviewAccessibilityListResponse";

export const getAccessibilityList = async () => {
  return await blagocityApi().get<TGetAccessibilityListResponse>("/accessibility_criteria").json();
};

export const getReviewAccessibilityList = async () => {
  return await blagocityApi().get<TGetReviewAccessibilityListResponse>("/review_accessibility_criteria").json();
};
