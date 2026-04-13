import { FC, useEffect, useState } from "react";
import ModalLayout from "@/components/layouts/modal-layout";
import { ScrollView, StyleSheet } from "react-native";
import { getAddressByCoords } from "@/actions/mapbox-actions";
import OnboardingButton from "@/components/buttons/onboarding-button";
import GeoPositionBlock from "@/components/blocks/geo-position-block";
import PlaceNameBlock from "@/components/blocks/place-name-block";
import PhotoUploadBlock from "@/components/blocks/photo-upload-block";
import PlaceTypeBlock from "@/components/blocks/place-type-block";
import ReviewBlock from "@/components/blocks/review-block";
import AccessibleEnvironmentBlock from "@/components/blocks/accessible-environment-block";

type TProps = {
  id: string;
  coords?: string;
};

const styles = StyleSheet.create({
  scrollable: {
    gap: 24,
    padding: 20,
  },
});
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
    return (
      <ModalLayout title="Добавление локации">
        <ScrollView contentContainerStyle={styles.scrollable}>
          <GeoPositionBlock />
          <PlaceNameBlock />
          <PhotoUploadBlock />
          <PlaceTypeBlock />
          <AccessibleEnvironmentBlock />
          <ReviewBlock />
          <OnboardingButton text="Добавить" />
        </ScrollView>
      </ModalLayout>
    );
  }

  return <ModalLayout title="Редактирование локации"></ModalLayout>;
};

export default EditLocationModal;
