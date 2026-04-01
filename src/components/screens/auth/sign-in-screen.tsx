import { ChangeEvent, FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import Input from "@/components/inputs/input";
import COLORS from "@/constants/colors";
import OnboardingButton from "@/components/buttons/onboarding-button";
import LinkButton from "@/components/buttons/link-button";
import { Image } from "expo-image";
import { toFormikValidationSchema } from "zod-formik-adapter";
import signInSchema from "@/schemes/auth/sign-in-schema";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  logo: {
    width: 295,
    height: (376 * 295) / 507,
    marginBottom: 30,
  },
  form: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  buttons: {
    width: "100%",
    gap: 20,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    gap: 8,
  },
  footerText: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
});
const SignInScreen: FC = () => {
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const handleOnInputChange = (callBack: (e: string | ChangeEvent<any>) => void, e: string | ChangeEvent<any>) => {
    setError(false);
    callBack(e);
  };
  const handleOnSubmit = async ({ nickname, code }: { nickname: string; code: string }) => {
    setPending(true);
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? behavior : "height"} style={styles.container}>
      <Formik
        initialValues={{
          nickname: "",
          code: "",
        }}
        validationSchema={toFormikValidationSchema(signInSchema)}
        onSubmit={handleOnSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <Image source={{ uri: "logo" }} style={styles.logo} />
                <Input
                  label="Никнейм"
                  placeholder="Введите ваш никнейм"
                  value={values.nickname}
                  error={touched.nickname && !!errors.nickname ? errors.nickname : ""}
                  disabled={pending}
                  onChange={e => handleOnInputChange(handleChange("nickname"), e)}
                  onBlur={handleBlur("nickname")}
                />
                <Input
                  label="Кодовое слово"
                  placeholder="Введите кодовое слово"
                  value={values.code}
                  isSecure={isSecure}
                  error={touched.code && !!errors.code ? errors.code : ""}
                  disabled={pending}
                  onChange={e => handleOnInputChange(handleChange("code"), e)}
                  onBlur={handleBlur("code")}
                />
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Нет аккаунта?</Text>
                  <LinkButton text="Зарегистрироваться" href="/auth/sign-up" />
                </View>
                <View style={styles.buttons}>
                  <OnboardingButton
                    text="Войти"
                    pendingText="Вход в приложение..."
                    pending={pending}
                    onPress={handleSubmit}
                  />
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>Забыли кодовое слово?</Text>
                    <LinkButton text="Восстановить" href="/" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
