import { FC } from "react";
import InnerLayout from "@/components/layouts/inner-layout";
import { Button, Text } from "react-native";
import { useRouter } from "expo-router";

type TProps = {
  id: string;
};

const LocationScreen: FC<TProps> = ({ id }) => {
  const router = useRouter();
  const handleOnAlertPress = () => {
    router.push("/tabs/map/location/outgoing-help-request");
  };

  return (
    <InnerLayout withBack title="Локация">
      <Text>{id}</Text>
      <Button title="Вызвать помощника" onPress={handleOnAlertPress} />
    </InnerLayout>
  );
};

export default LocationScreen;
