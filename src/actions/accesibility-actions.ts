import blagocityApi from "@/api/blagocity-api";
import TGetAccessibilityListResponse, {
  TGetAccessibilityResponse,
} from "@/models/contracts/accessibility/getAccessibilityListResponse";
import TGetReviewAccessibilityListResponse from "@/models/contracts/accessibility/getReviewAccessibilityListResponse";
import TCreateReviewAccessibilityRequest from "@/models/contracts/accessibility/createReviewAccessibilityRequest";

export const getAccessibilityList = async () => {
  return await blagocityApi().get<TGetAccessibilityListResponse>("/accessibility_criteria").json();
};

export const getAccessibility = async (guid: string) => {
  return await blagocityApi().get<TGetAccessibilityResponse>(`/accessibility_criteria/${guid}`).json();
};

export const getReviewAccessibilityList = async () => {
  return await blagocityApi().get<TGetReviewAccessibilityListResponse>("/review_accessibility_criteria").json();
};

export const createReviewAccessibility = async (token: string, request: TCreateReviewAccessibilityRequest) => {
  return await blagocityApi(token)
    .post("/review_accessibility_criteria", {
      json: request,
    })
    .json();
};
