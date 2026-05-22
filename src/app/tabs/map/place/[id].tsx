import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import PlaceScreen from "@/components/screens/tabs/place-screen";

const Place: FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return <PlaceScreen id={id} />;
};

export default Place;
