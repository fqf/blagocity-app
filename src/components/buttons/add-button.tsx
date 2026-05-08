import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import { useBus } from "react-bus";

const styles = StyleSheet.create({
  shape: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.active,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  shadow: {
    shadowColor: COLORS.active,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.65,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
const AddButton: FC = () => {
  const bus = useBus();
  const handleOnButtonPress = () => {
    bus.emit("add-press");
  };

  return (
    <TouchableOpacity activeOpacity={0.65} onPress={handleOnButtonPress}>
      <DropShadow style={styles.shadow}>
        <View style={styles.shape}>
          <Icon icon={EIcon.Plus} fill="white" style={styles.icon} />
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default AddButton;
