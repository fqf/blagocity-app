import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import useProfileStore from "@/stores/profile-store";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.error,
  },
});
const ExitButton: FC = () => {
  const router = useRouter();
  const { reset } = useProfileStore();
  const handleOnButtonPress = async () => {
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);
    router.replace("/auth/sign-in");
    reset();
  };

  return (
    <TouchableOpacity activeOpacity={0.55} onPress={handleOnButtonPress}>
      <ShadowBlock>
        <View style={styles.container}>
          <Icon icon={EIcon.Quit} fill={COLORS.error} style={styles.icon} />
          <Text style={styles.text}>Выйти из аккаунта</Text>
        </View>
      </ShadowBlock>
    </TouchableOpacity>
  );
};

export default ExitButton;
