import { FC, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 18,
    textAlign: "center",
    color: "#A1A4B2",
  },
});

const LoginScreen: FC = () => {
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
            <Text style={styles.text}>Никнейм</Text>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
