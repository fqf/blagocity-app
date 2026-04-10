import { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import TContainerProps from "@/models/types/container-props";
import COLORS from "@/constants/colors";

type TProps = TContainerProps & {
  step: number;
  title: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  content: {
    width: "100%",
    flex: 1,
  },
  form: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 100,
  },
  step: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 14,
    color: COLORS.label,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 32,
  },
});
const AboutStepsLayout: FC<TProps> = ({ children, step, title }) => {
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
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.step}>ШАГ {step}</Text>
            <Text style={styles.title}>{title}</Text>
            {children}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AboutStepsLayout;
