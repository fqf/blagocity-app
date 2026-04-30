type TCreatePlaceRequest = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeType: string;
  accessibilityCriteria: string[];
  photos: string[];
  createdBy: string;
  ownerReviewTrackingEnabled: boolean;
};

export default TCreatePlaceRequest;
