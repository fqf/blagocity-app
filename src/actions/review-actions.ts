import blagocityApi from "@/api/blagocity-api";
import TGetReviewsListResponse from "@/models/contracts/review/getReviewsListResponse";
import TGetReviewResponse from "@/models/contracts/review/getReviewResponse";
import TCreateReviewRequest from "@/models/contracts/review/createReviewRequest";

export const getReviewsList = async () => {
  return await blagocityApi().get<TGetReviewsListResponse>("/reviews").json();
};

export const getReview = async (guid: string) => {
  return await blagocityApi().get<TGetReviewResponse>(`/reviews/${guid}`).json();
};

export const createReview = async (request: TCreateReviewRequest) => {
  return await blagocityApi().post("/reviews").json();
};
