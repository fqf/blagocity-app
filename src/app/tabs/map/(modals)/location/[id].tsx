import { FC } from "react";
import LocationModal from "@/components/modals/location-modal";
import { useLocalSearchParams } from "expo-router";

const Location: FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return <LocationModal id={id} />;
};

export default Location;
