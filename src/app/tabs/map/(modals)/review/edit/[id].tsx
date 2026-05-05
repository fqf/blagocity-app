import { FC } from "react";
import EditReviewModal from "@/components/modals/edit-review-modal";
import { useLocalSearchParams } from "expo-router";

const EditReview: FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return <EditReviewModal />;
};

export default EditReview;
