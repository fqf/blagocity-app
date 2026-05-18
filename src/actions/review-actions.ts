import blagocityApi from "@/api/blagocity-api";
import TGetReviewsListResponse from "@/models/contracts/review/getReviewsListResponse";
import TGetReviewResponse from "@/models/contracts/review/getReviewResponse";
import TCreateReviewRequest from "@/models/contracts/review/createReviewRequest";
import TCreateReviewResponse from "@/models/contracts/review/createReviewResponse";

export const getReviewsList = async (placeGuid: string) => {
  return await blagocityApi()
    .get<TGetReviewsListResponse>(`/reviews?establishment=/api/establishments/${placeGuid}`)
    .json();
};

export const getReview = async (guid: string) => {
  return await blagocityApi().get<TGetReviewResponse>(`/reviews/${guid}`).json();
};

export const createReview = async (token: string, request: TCreateReviewRequest) => {
  return await blagocityApi(token)
    .post<TCreateReviewResponse>("/reviews", {
      json: request,
    })
    .json();
};
