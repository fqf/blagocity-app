import { ChangeEvent, FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "@/components/inputs/input";
import AvatarPicker from "@/components/pickers/avatar-picker";
import GenderPicker from "@/components/pickers/gender-picker";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik } from "formik";
import OnboardingButton from "@/components/buttons/onboarding-button";
import EGender from "@/models/enums/gender";
import aboutStep1Schema from "@/schemes/auth/about-step-1-schema";
import { declOfYears } from "@/lib/decl-of-num";
import { TAvatarType } from "@/components/buttons/avatar-button";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 32,
  },
  content: {
    paddingHorizontal: 20,
    gap: 32,
  },
  buttons: {
    width: "100%",
    position: "absolute",
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
const Step1Screen: FC = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const handleOnInputChange = (callBack: (e: string | ChangeEvent<any>) => void, e: string | ChangeEvent<any>) => {
    callBack(e);
  };
  const handleOnSubmit = async ({ avatar, gender, age }: { avatar?: TAvatarType; gender?: EGender; age: string }) => {
    setPending(true);
    setTimeout(() => {
      router.push("/auth/about/step-2");
    }, 1000);
  };

  return (
    <Formik
      initialValues={{
        avatar: undefined,
        gender: undefined,
        age: "",
      }}
      validationSchema={toFormikValidationSchema(aboutStep1Schema)}
      onSubmit={handleOnSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.container}>
            <AvatarPicker
              value={values.avatar}
              error={touched.avatar && !!errors.avatar ? errors.avatar : ""}
              disabled={pending}
              onPick={handleChange("avatar")}
            />
            <View style={styles.content}>
              <GenderPicker
                value={values.gender}
                error={touched.gender && !!errors.gender ? errors.gender : ""}
                disabled={pending}
                onPick={handleChange("gender")}
              />
              <Input
                label="Возраст"
                placeholder="Например, 25"
                inputMode="decimal"
                keyboardType="decimal-pad"
                value={values.age}
                disabled={pending}
                unit={declOfYears(+(values.age ?? 0))}
                error={touched.age && !!errors.age ? errors.age : ""}
                onChange={e => handleOnInputChange(handleChange("age"), e)}
                onBlur={handleBlur("age")}
              />
            </View>
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

export default Step1Screen;
