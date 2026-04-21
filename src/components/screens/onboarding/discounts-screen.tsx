import { FC } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import OnboardingButton from "@/components/buttons/onboarding-button";
import COLORS from "@/constants/colors";
import { Image } from "expo-image";
import Stepper from "@/components/others/stepper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    paddingHorizontal: 20,
  },
  image: {
    width: 314,
    height: 314,
    marginBottom: 45,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
    textAlign: "center",
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    gap: 22,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
const DiscountsScreen: FC = () => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push("/tabs/map");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "discounts" }} style={styles.image} />
      <Text style={styles.title}>Получай скидки</Text>
      <Text style={styles.text}>Зарабатывай баллы за активность и обменивай их на реальные скидки в заведениях.</Text>
      <View style={styles.buttons}>
        <Stepper count={3} current={2} />
        <OnboardingButton text="Начать" onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default DiscountsScreen;
