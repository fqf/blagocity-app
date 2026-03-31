import { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import Input from "@/components/inputs/input";
import COLORS from "@/constants/colors";
import OnboardingButton from "@/components/buttons/onboarding-button";
import LinkButton from "@/components/buttons/link-button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  form: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 20,
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
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <Input label="Никнейм" placeholder="Введите ваш никнейм" />
                <Input label="Кодовое слово" placeholder="Введите кодовое слово" />
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Нет аккаунта?</Text>
                  <LinkButton text="Зарегистрироваться" href="/auth/sign-up" />
                </View>
                <View style={styles.buttons}>
                  <OnboardingButton text="Войти" />
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
