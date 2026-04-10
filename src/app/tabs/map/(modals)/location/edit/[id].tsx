import { FC } from "react";
import EditLocationModal from "@/components/modals/edit-location-modal";
import { useLocalSearchParams } from "expo-router";

const EditLocation: FC = () => {
  const { id, coords }: { id: string; coords?: string } = useLocalSearchParams();
  return <EditLocationModal id={id} coords={coords} />;
};

export default EditLocation;
