import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import DropShadow from "react-native-drop-shadow";
import Icon from "@/components/icons/icon";

type TProps = {
  icon: EIcon;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  shape: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 18,
    height: 18,
  },
  shadow: {
    shadowColor: COLORS.active,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});
const MapButton: FC<TProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={onPress}>
      <DropShadow style={styles.shadow}>
        <View style={styles.shape}>
          <Icon icon={icon} fill={COLORS.active} style={styles.icon} />
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default MapButton;
