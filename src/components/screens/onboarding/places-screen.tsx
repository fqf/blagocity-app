import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import OnboardingButton from "@/components/buttons/onboarding-button";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import COLORS from "@/constants/colors";

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
const PlacesScreen: FC = () => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push("/onboarding/clans");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "places" }} style={styles.image} />
      <Text style={styles.title}>Открывай новые места</Text>
      <Text style={styles.text}>Находи интересные локации, кафе и парки в своем городе на интерактивной карте.</Text>
      <View style={styles.buttons}>
        <OnboardingButton text="Далее" onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default PlacesScreen;
