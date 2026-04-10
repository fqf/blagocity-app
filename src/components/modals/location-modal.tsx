import { FC } from "react";
import { Text } from "react-native";
import ModalLayout from "@/components/layouts/modal-layout";

type TProps = {
  id: string;
};

const LocationModal: FC<TProps> = ({ id }) => {
  return (
    <ModalLayout title="Разработчик">
      <Text>Тут живёт разработчик</Text>
      <Text>ID локации: {id}</Text>
    </ModalLayout>
  );
};

export default LocationModal;
