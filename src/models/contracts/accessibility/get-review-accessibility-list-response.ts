export type TGetReviewAccessibilityResponse = {
  guid: string;
  review: string;
  criterion: string;
  value: boolean;
};

type TGetReviewAccessibilityListResponse = TGetReviewAccessibilityResponse[];

export default TGetReviewAccessibilityListResponse;
