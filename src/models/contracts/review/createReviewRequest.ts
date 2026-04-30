type TCreateReviewRequest = {
  establishment: string;
  author: string;
  rating: number;
  text: string;
  isActive: string;
  reviewedAt: string;
  photos: string[];
};

export default TCreateReviewRequest;
