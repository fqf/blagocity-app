type TCreateReviewRequest = {
  establishment: string;
  author: string;
  rating: number;
  text: string;
  isActive: boolean;
  reviewedAt: string;
  photos: string[];
};

export default TCreateReviewRequest;
