import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/buttons/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import OnboardingButton from "@/components/buttons/onboarding-button";
import aboutStep2Schema from "@/schemes/auth/about-step-2-schema";
import COLORS from "@/constants/colors";
import useSignUpStore from "@/stores/sign-up-store";
import Skeleton from "@/components/others/skeleton";
import { getDisabilityTypesList } from "@/actions/disablity-types-actions";
import TGetDisabilityTypesListResponse from "@/models/contracts/disabilityTypes/getDisabilityTypesListResponse";
import { getRolesList } from "@/actions/roles-actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 12,
    paddingHorizontal: 20,
  },
  buttons: {
    width: "100%",
    position: "absolute",
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
  },
});
const Step2Screen: FC = () => {
  const [disabilityTypesPending, setDisabilityTypesPending] = useState(true);
  const [disabilityTypes, setDisabilityTypes] = useState<TGetDisabilityTypesListResponse>([]);
  const [role, setRole] = useState(null);
  const [pending, setPending] = useState(false);
  const { name, password, avatar, gender, dob } = useSignUpStore();
  const router = useRouter();
  const handleOnPress = (values: string[], value: string, setFieldValue: (field: string, value: string[]) => void) => {
    if (values.includes(value)) {
      setFieldValue("disabilityTypes", [...values.filter(item => item !== value)]);
    } else {
      setFieldValue("disabilityTypes", [...new Set(values).add(value)]);
    }
  };
  const handleOnSubmit = async ({ disabilityTypes }: { disabilityTypes: string[] }) => {
    setPending(true);
    console.log(name);
    console.log(password);
    console.log(avatar);
    console.log(gender);
    console.log(dob);
  };

  useEffect(() => {
    (async () => {
      setDisabilityTypesPending(true);

      try {
        const disabilityTypesList = await getDisabilityTypesList();
        console.log(disabilityTypesList);
        const roles = await getRolesList();
        console.log(roles);
      } catch (e) {
        console.log(e);
      }

      setDisabilityTypesPending(false);
    })();
  }, []);

  if (disabilityTypesPending) {
    return (
      <View style={styles.container}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </View>
    );
  }

  return (
    <Formik
      initialValues={{
        disabilityTypes: [] as string[],
      }}
      validationSchema={toFormikValidationSchema(aboutStep2Schema)}
      onSubmit={handleOnSubmit}>
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <>
          <View style={styles.container}>
            {disabilityTypes.map((t, i) => (
              <Button
                key={i}
                type="outlined"
                text={t.displayName}
                active={values.disabilityTypes?.includes(t.guid)}
                error={!!errors.disabilityTypes}
                onPress={() => handleOnPress(values.disabilityTypes, t.guid, setFieldValue)}
              />
            ))}
            {!!errors.disabilityTypes && <Text style={styles.error}>{errors.disabilityTypes}</Text>}
          </View>
          <View style={styles.buttons}>
            <OnboardingButton
              text="Далее"
              pendingText="Сохранение данных..."
              pending={pending}
              onPress={handleSubmit}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default Step2Screen;
