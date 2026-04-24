import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/buttons/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import OnboardingButton from "@/components/buttons/onboarding-button";
import aboutStep2Schema from "@/schemes/auth/about-step-2-schema";
import COLORS from "@/constants/colors";
import useSignUpStore from "@/stores/sign-up-store";

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
  const [pending, setPending] = useState(false);
  const { name, password, avatar, gender, dob } = useSignUpStore();
  const router = useRouter();
  const handleOnPress = (values: number[], value: number, setFieldValue: (field: string, value: number[]) => void) => {
    if (values.includes(value)) {
      setFieldValue("features", [...values.filter(item => item !== value)]);
    } else {
      setFieldValue("features", [...new Set(values).add(value)]);
    }
  };
  const handleOnSubmit = async ({ features }: { features: number[] }) => {
    setPending(true);
    console.log(name);
    console.log(password);
    console.log(avatar);
    console.log(gender);
    console.log(dob);
  };

  return (
    <Formik
      initialValues={{
        features: [] as number[],
      }}
      validationSchema={toFormikValidationSchema(aboutStep2Schema)}
      onSubmit={handleOnSubmit}>
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <>
          <View style={styles.container}>
            <Button
              type="outlined"
              text="Я использую инвалидную коляску"
              active={values.features?.includes(0)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 0, setFieldValue)}
            />
            <Button
              type="outlined"
              text="Я слепой / Слабовидящий"
              active={values.features?.includes(1)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 1, setFieldValue)}
            />
            <Button
              type="outlined"
              text="Я глухой / Слабослышащий"
              active={values.features?.includes(2)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 2, setFieldValue)}
            />
            <Button
              type="outlined"
              text="Я перенес полиомелит"
              active={values.features?.includes(3)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 3, setFieldValue)}
            />
            <Button
              type="outlined"
              text="У меня ДЦП"
              active={values.features?.includes(4)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 4, setFieldValue)}
            />
            <Button
              type="outlined"
              text="Другое"
              active={values.features?.includes(5)}
              error={!!errors.features}
              onPress={() => handleOnPress(values.features, 5, setFieldValue)}
            />
            {!!errors.features && <Text style={styles.error}>{errors.features}</Text>}
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
