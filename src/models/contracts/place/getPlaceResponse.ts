import TGetReviewResponse from "@/models/contracts/review/getReviewResponse";

type TGetPlaceResponse = {
  guid: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeType: string;
  accessibilityCriteria: string[];
  photos: string[];
  createdBy: string;
  ownerReviewTrackingEnabled: boolean;
  reviews: Exclude<TGetReviewResponse, "establishment">[];
};

export default TGetPlaceResponse;
