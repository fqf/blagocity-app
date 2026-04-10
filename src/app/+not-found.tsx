import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import Button from "@/components/buttons/button";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 20,
    color: COLORS.error,
  },
});
const NotFound = () => {
  const router = useRouter();
  const handleOnButtonPress = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вы заблудились :(</Text>
      <Button type="outlined" text="Вернуться на главный экран" onPress={handleOnButtonPress} />
    </View>
  );
};

export default NotFound;
