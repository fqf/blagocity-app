import { FC } from "react";
import EditPlaceModal from "@/components/modals/edit-place-modal";
import { useLocalSearchParams } from "expo-router";

const EditPlace: FC = () => {
  const { id, coords }: { id: string; coords?: string } = useLocalSearchParams();
  return <EditPlaceModal id={id} coords={coords} />;
};

export default EditPlace;
