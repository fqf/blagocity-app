import { FC, useEffect, useState } from "react";
import ModalLayout from "@/components/layouts/modal-layout";
import { Text } from "react-native";
import { getAddressByCoords } from "@/actions/mapbox-actions";

type TProps = {
  id: string;
  coords?: string;
};

const EditLocationModal: FC<TProps> = ({ id, coords }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (id === "-1") {
      (async () => {
        const [longitude, latitude] = (coords ?? ",").split(",");
        const { features }: any = await getAddressByCoords(+longitude, +latitude).json();
        let addressData = features?.[0].properties.full_address.split(",");
        addressData.splice(0, 1);
        addressData = addressData.filter((item: string) => isNaN(+item));
        setAddress(addressData.join(",").trim());
      })();
    }
  }, [id]);

  if (id === "-1") {
    return <ModalLayout title="Добавление локации">{!!address && <Text>{address}</Text>}</ModalLayout>;
  }

  return <ModalLayout title="Редактирование локации"></ModalLayout>;
};

export default EditLocationModal;
