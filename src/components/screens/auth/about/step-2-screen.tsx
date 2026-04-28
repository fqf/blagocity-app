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
import { isKyError } from "ky";
import { createUser } from "@/actions/user-actions";
import EGender from "@/models/enums/gender";
import * as SecureStore from "expo-secure-store";
import { signIn } from "@/actions/auth-actions";
import useProfileStore from "@/stores/profile-store";

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
    bottom: 30,
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
  const [role, setRole] = useState<string>("");
  const [pending, setPending] = useState(false);
  const { name, password, avatar, gender, dob, reset } = useSignUpStore();
  const { setUserData } = useProfileStore();
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

    try {
      const userData = await createUser({
        login: name,
        gender: gender === EGender.Male ? "Мужской" : "Женский",
        password,
        birthday: dob?.toISOString() || "",
        name,
        avatar: avatar?.toString() || "",
        roles: [`api/roles/${role}`],
        disabilityTypes: disabilityTypes.map(dt => `api/disability_types/${dt}`),
      });
      setUserData(userData);
      const { token } = await signIn({ login: name, password });
      SecureStore.setItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!, token);
      reset();
      router.push("/onboarding/places");
    } catch (e) {
      if (isKyError(e)) {
        console.error(e.message);
      }
    }

    setPending(false);
  };

  useEffect(() => {
    (async () => {
      setDisabilityTypesPending(true);

      try {
        const disabilityTypesList = await getDisabilityTypesList();
        disabilityTypesList.sort(a => (a.displayName === "Другое" ? 0 : -1));
        setDisabilityTypes(disabilityTypesList);

        const roles = await getRolesList();
        const userRole = roles.find(r => r.name === "user");

        if (userRole) {
          setRole(userRole.guid);
        }
      } catch (e) {
        if (isKyError(e)) {
          console.error(e.message);
        }
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
                disabled={pending}
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
