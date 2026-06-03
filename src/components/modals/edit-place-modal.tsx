import { ChangeEvent, FC, useEffect, useState } from "react";
import ModalLayout from "@/components/layouts/modal-layout";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { getAddressByCoords } from "@/actions/mapbox-actions";
import OnboardingButton from "@/components/buttons/onboarding-button";
import GeoPositionBlock from "@/components/blocks/geo-position-block";
import PlaceNameBlock from "@/components/blocks/place-name-block";
import PlaceTypeBlock from "@/components/blocks/place-type-block";
import AccessibleEnvironmentBlock from "@/components/blocks/accessible-environment-block";
import { defaultLocation } from "@/components/screens/tabs/map-screen";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import editPlaceSchema from "@/schemes/tabs/edit-place-schema";
import { createPlace, getPlacesList } from "@/actions/place-actions";
import * as SecureStore from "expo-secure-store";
import useProfileStore from "@/stores/profile-store";
import { useRouter } from "expo-router";
import useMapStore from "@/stores/map-store";
import processError from "@/lib/process-error";

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
    paddingBottom: 30,
  },
});
const EditPlaceModal: FC<TProps> = ({ id, coords }) => {
  const [pending, setPending] = useState(false);
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const [address, setAddress] = useState("");
  const { userData } = useProfileStore();
  const { setPlacesList } = useMapStore();
  const router = useRouter();
  const handleOnInputChange = (callBack: (e: string | ChangeEvent<any>) => void, e: string | ChangeEvent<any>) => {
    callBack(e);
  };
  const handleOnTypeSelect = (value: string, setFieldValue: (field: string, value: string) => void) => {
    setFieldValue("type", value);
  };
  const handleOnAccessibilitySelect = (
    values: string[],
    value: string,
    setFieldValue: (field: string, value: string[]) => void,
  ) => {
    if (values.includes(value)) {
      setFieldValue("accessibility", [...values.filter(item => item !== value)]);
    } else {
      setFieldValue("accessibility", [...new Set(values).add(value)]);
    }
  };
  const handleOnSubmit = async ({
    name,
    type,
    accessibility,
  }: {
    name: string;
    type: string;
    accessibility: string[];
  }) => {
    setPending(true);

    try {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (!token) {
        throw new Error("Bad token");
      }

      await createPlace(token, {
        name,
        address,
        latitude: +(coords?.split(",")?.[1] ?? 0),
        longitude: +(coords?.split(",")?.[0] ?? 0),
        placeType: `api/place_types/${type}`,
        accessibilityCriteria: accessibility.map(item => `api/accessibility_criteria/${item}`),
        createdBy: `api/users/${userData?.guid}`,
        ownerReviewTrackingEnabled: true,
        photos: [],
      });
      const placesList = await getPlacesList();
      setPlacesList(placesList);

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/tabs/map");
      }
    } catch (e: unknown) {
      await processError(e);

      setPending(false);
    }
  };

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
  }, [coords, id]);

  if (id === "-1") {
    return (
      <ModalLayout title="Добавление локации">
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? behavior : "height"} style={styles.container}>
          <Formik
            initialValues={{ name: "", type: "", accessibility: [] as string[] }}
            validationSchema={toFormikValidationSchema(editPlaceSchema)}
            onSubmit={handleOnSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={[styles.form, behavior ? { paddingBottom: 70 } : null]}>
                    <GeoPositionBlock coords={coords ?? defaultLocation.join(",")} address={address ?? ""} />
                    <PlaceNameBlock
                      value={values.name}
                      error={touched.name && !!errors.name ? errors.name : ""}
                      disabled={pending}
                      onChange={e => handleOnInputChange(handleChange("name"), e)}
                      onBlur={handleBlur("name")}
                    />
                    <PlaceTypeBlock
                      value={values.type}
                      error={errors.type}
                      disabled={pending}
                      onPress={value => handleOnTypeSelect(value, setFieldValue)}
                    />
                    <AccessibleEnvironmentBlock
                      value={values.accessibility}
                      error={errors.accessibility as string}
                      disabled={pending}
                      onPress={value => handleOnAccessibilitySelect(values.accessibility, value, setFieldValue)}
                    />
                    <OnboardingButton
                      text="Добавить локацию"
                      pending={pending}
                      pendingText="Сохранение данных..."
                      onPress={handleSubmit}
                    />
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

export default EditPlaceModal;
