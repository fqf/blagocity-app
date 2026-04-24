import { ChangeEvent, FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import { Formik } from "formik";
import Input from "@/components/inputs/input";
import OnboardingButton from "@/components/buttons/onboarding-button";
import LinkButton from "@/components/buttons/link-button";
import { Image } from "expo-image";
import { toFormikValidationSchema } from "zod-formik-adapter";
import signUpSchema from "@/schemes/auth/sign-up-schema";
import { useRouter } from "expo-router";
import useSignUpStore from "@/stores/sign-up-store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    bottom: 25,
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
const SignUpScreen: FC = () => {
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const [isSecure, setIsSecure] = useState(true);
  const { setName, setPassword } = useSignUpStore();
  const router = useRouter();
  const handleOnInputChange = (callBack: (e: string | ChangeEvent<any>) => void, e: string | ChangeEvent<any>) => {
    callBack(e);
  };
  const handleOnSubmit = async ({ nickname, code }: { nickname: string; code: string }) => {
    setName(nickname);
    setPassword(code);
    router.push("/auth/about/step-1");
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
          code2: "",
        }}
        validationSchema={toFormikValidationSchema(signUpSchema)}
        onSubmit={handleOnSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <Image source={{ uri: "logo" }} style={styles.logo} />
                <Input
                  label="Никнейм"
                  placeholder="Придумайте ваш никнейм"
                  value={values.nickname}
                  error={touched.nickname && !!errors.nickname ? errors.nickname : ""}
                  onChange={e => handleOnInputChange(handleChange("nickname"), e)}
                  onBlur={handleBlur("nickname")}
                />
                <Input
                  label="Кодовое слово"
                  placeholder="Придумайте кодовое слово"
                  value={values.code}
                  isSecure={isSecure}
                  error={touched.code && !!errors.code ? errors.code : ""}
                  onChange={e => handleOnInputChange(handleChange("code"), e)}
                  onBlur={handleBlur("code")}
                />
                <Input
                  placeholder="Повторите кодовое слово"
                  value={values.code2}
                  isSecure={isSecure}
                  error={touched.code2 && !!errors.code2 ? errors.code2 : ""}
                  onChange={e => handleOnInputChange(handleChange("code2"), e)}
                  onBlur={handleBlur("code2")}
                />
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Запомните ваш никнейм и кодовое слово. Они могут понадобиться службе технической поддержки, если
                    что-то пойдет не так
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <OnboardingButton
                    text="Зарегистрироваться"
                    pendingText="Регистрация в приложении..."
                    onPress={handleSubmit}
                  />
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>Уже есть аккаунт?</Text>
                    <LinkButton text="Авторизоваться" href="/auth/sign-in" />
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

export default SignUpScreen;
