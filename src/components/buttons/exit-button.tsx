import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShadowBlock from "@/components/others/shadow-block";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

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
  return (
    <TouchableOpacity activeOpacity={0.55}>
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
