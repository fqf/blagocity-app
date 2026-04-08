import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, View } from "react-native";
import Icon from "@/components/icons/icon";
import COLORS from "@/constants/colors";

type TProps = {
  icon: EIcon;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.activeBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
const IconBlock: FC<TProps> = ({ icon }) => {
  return (
    <View style={styles.container}>
      <Icon icon={icon} fill={COLORS.active} style={styles.icon} />
    </View>
  );
};

export default IconBlock;
