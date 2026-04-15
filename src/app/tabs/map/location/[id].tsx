import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import LocationScreen from "@/components/screens/tabs/location-screen";

const Location: FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return <LocationScreen id={id} />;
};

export default Location;
