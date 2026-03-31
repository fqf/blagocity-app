import { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import { Formik } from "formik";
import Input from "@/components/inputs/input";
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
const SignUpScreen: FC = () => {
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
                <Input label="Никнейм" placeholder="Придумайте ваш никнейм" />
                <Input label="Кодовое слово" placeholder="Придумайте кодовое слово" />
                <Input placeholder="Повторите кодовое слово" />
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Запомните ваш никнейм и кодовое слово. Они могут понадобиться службе технической поддержки, если
                    что-то пойдет не так
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <OnboardingButton text="Зарегистрироваться" />
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
