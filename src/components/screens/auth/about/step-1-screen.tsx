import { ChangeEvent, FC } from "react";
import { StyleSheet, View } from "react-native";
import Input from "@/components/inputs/input";
import AvatarPicker from "@/components/pickers/avatar-picker";
import GenderPicker from "@/components/pickers/gender-picker";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik } from "formik";
import OnboardingButton from "@/components/buttons/onboarding-button";
import EGender from "@/models/enums/gender";
import aboutStep1Schema from "@/schemes/auth/about-step-1-schema";
import { TAvatarType } from "@/components/buttons/avatar-button";
import { useRouter } from "expo-router";
import useSignUpStore from "@/stores/sign-up-store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "DD.MM.YYYY";
const MIN_DATE = dayjs("01.01.1900", DATE_FORMAT);
const MAX_DATE = dayjs("31.12.2000", DATE_FORMAT);
const isDatePartPrefixAllowed = (value: string, min: number, max: number, maxLength: number) => {
  if (!/^\d*$/.test(value) || value.length > maxLength) {
    return false;
  }

  if (!value) {
    return true;
  }

  const factor = 10 ** (maxLength - value.length);
  const lowerBound = Number(value) * factor;
  const upperBound = lowerBound + factor - 1;

  return upperBound >= min && lowerBound <= max;
};

const isDateAllowed = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const normalizedValue =
    digits.length <= 2
      ? digits
      : digits.length <= 4
        ? `${digits.slice(0, 2)}.${digits.slice(2)}`
        : `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
  const [day = "", month = "", year = ""] = normalizedValue.split(".");

  const isDayAllowed =
    day.length === 1 ? isDatePartPrefixAllowed(day, 0, 3, 1) : isDatePartPrefixAllowed(day, 1, 31, 2);
  const isMonthAllowed =
    month.length === 1 ? isDatePartPrefixAllowed(month, 0, 1, 1) : isDatePartPrefixAllowed(month, 1, 12, 2);

  if (!isDayAllowed || !isMonthAllowed || !isDatePartPrefixAllowed(year, 1900, 2000, 4)) {
    return false;
  }

  if (normalizedValue.length < 10) {
    return true;
  }

  const date = dayjs(normalizedValue, DATE_FORMAT, true);

  return date.isValid() && !date.isBefore(MIN_DATE, "day") && !date.isAfter(MAX_DATE, "day");
};

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
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
const Step1Screen: FC = () => {
  const { setAvatar, setGender, setDOB } = useSignUpStore();
  const router = useRouter();
  const handleOnInputChange = (
    callBack: (e: string | ChangeEvent<any>) => void,
    e: string | ChangeEvent<any>,
    currentValue: string,
  ) => {
    if (typeof e === "string" && e.length === 10) {
      if (!isDateAllowed(e)) {
        callBack(currentValue);
        return;
      }
    }

    callBack(e);
  };
  const handleOnSubmit = async ({ avatar, gender, dob }: { avatar?: TAvatarType; gender?: EGender; dob: string }) => {
    if (avatar) {
      setAvatar(avatar);
    }

    if (gender) {
      setGender(gender);
    }

    if (dob) {
      setDOB(dayjs(dob, DATE_FORMAT).startOf("day"));
    }

    router.push("/auth/about/step-2");
  };

  return (
    <Formik
      initialValues={{
        avatar: undefined,
        gender: undefined,
        dob: "",
      }}
      validationSchema={toFormikValidationSchema(aboutStep1Schema)}
      onSubmit={handleOnSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.container}>
            <AvatarPicker
              value={values.avatar}
              error={touched.avatar && !!errors.avatar ? errors.avatar : ""}
              onPick={handleChange("avatar")}
            />
            <View style={styles.content}>
              <GenderPicker
                value={values.gender}
                error={touched.gender && !!errors.gender ? errors.gender : ""}
                onPick={handleChange("gender")}
              />
              <Input
                maskType="datetime"
                maskOptions={{
                  format: DATE_FORMAT,
                }}
                checkText={(_, nextValue) => isDateAllowed(nextValue)}
                label="Дата рождения"
                placeholder="Например, 25.05.1975"
                inputMode="numeric"
                keyboardType="numeric"
                value={values.dob}
                maxLength={10}
                error={touched.dob && !!errors.dob ? errors.dob : ""}
                onChange={e => handleOnInputChange(handleChange("dob"), e, values.dob)}
                onBlur={handleBlur("dob")}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <OnboardingButton text="Далее" pendingText="Сохранение данных..." onPress={handleSubmit} />
          </View>
        </>
      )}
    </Formik>
  );
};

export default Step1Screen;
