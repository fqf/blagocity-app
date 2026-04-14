import { FC, useEffect, useState } from "react";
import ModalLayout from "@/components/layouts/modal-layout";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { getAddressByCoords } from "@/actions/mapbox-actions";
import OnboardingButton from "@/components/buttons/onboarding-button";
import GeoPositionBlock from "@/components/blocks/geo-position-block";
import PlaceNameBlock from "@/components/blocks/place-name-block";
import PhotoUploadBlock from "@/components/blocks/photo-upload-block";
import PlaceTypeBlock from "@/components/blocks/place-type-block";
import ReviewBlock from "@/components/blocks/review-block";
import AccessibleEnvironmentBlock from "@/components/blocks/accessible-environment-block";
import { defaultLocation } from "@/components/screens/tabs/map-screen";
import { Formik } from "formik";

type TProps = {
  id: string;
  coords?: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  form: {
    gap: 24,
    padding: 20,
  },
});
const EditLocationModal: FC<TProps> = ({ id, coords }) => {
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (Platform.OS === "android") {
      const showListener = Keyboard.addListener("keyboardDidShow", () => {
        setBehavior("height");
      });
      const hideListener = Keyboard.addListener("keyboardDidHide", () => {
        setBehavior(undefined);
      });

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }
  }, []);
  useEffect(() => {
    if (id === "-1") {
      if (coords) {
        (async () => {
          const [longitude, latitude] = coords.split(",");
          const { features }: any = await getAddressByCoords(+longitude, +latitude).json();
          let addressData = features?.[0].properties.full_address.split(",");
          addressData.splice(0, 1);
          addressData = addressData.filter((item: string) => isNaN(+item));
          setAddress(addressData.join(",").trim());
        })();
      }
    }
  }, [id]);

  if (id === "-1") {
    return (
      <ModalLayout title="Добавление локации">
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? behavior : "height"} style={styles.container}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={[styles.form, behavior ? { paddingBottom: 70 } : null]}>
                    <GeoPositionBlock coords={coords ?? defaultLocation.join(",")} address={address ?? ""} />
                    <PlaceNameBlock />
                    <PhotoUploadBlock />
                    <PlaceTypeBlock />
                    <AccessibleEnvironmentBlock />
                    <ReviewBlock />
                    <OnboardingButton text="Добавить" />
                  </View>
                </ScrollView>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ModalLayout>
    );
  }

  return <ModalLayout title="Редактирование локации"></ModalLayout>;
};

export default EditLocationModal;
