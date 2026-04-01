import { FC } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import OnboardingButton from "@/components/buttons/onboarding-button";
import COLORS from "@/constants/colors";
import { Image } from "expo-image";

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
    gap: 20,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
const ClansScreen: FC = () => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push("/onboarding/discounts");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "clans" }} style={styles.image} />
      <Text style={styles.title}>Объединяйся в кланы</Text>
      <Text style={styles.text}>Вступай в кланы, участвуй в активностях и соревнуйся с другими районами.</Text>
      <View style={styles.buttons}>
        <OnboardingButton text="Далее" onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default ClansScreen;
