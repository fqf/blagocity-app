import { FC } from "react";
import DropShadow from "react-native-drop-shadow";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import EIcon from "@/models/enums/icon";
import Icon from "@/components/icons/icon";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: COLORS.active,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: 76,
    height: 55,
    backgroundColor: COLORS.active,
    borderRadius: 14,
  },
  icon: {
    width: 33,
    height: 20,
  },
  text: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 12,
    color: "white",
  },
});
const AssistButton: FC = () => {
  const handleOnPress = () => {};

  return (
    <TouchableOpacity activeOpacity={0.65} style={styles.container} onPress={handleOnPress}>
      <DropShadow style={styles.shadow}>
        <View style={styles.content}>
          <Icon icon={EIcon.Ring} variant="active-filled" fill="white" style={styles.icon} />
          <Text style={styles.text}>Позвать</Text>
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default AssistButton;
