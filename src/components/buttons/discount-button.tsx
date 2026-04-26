import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import Icon from "@/components/icons/icon";
import COLORS from "@/constants/colors";

type TProps = {
  icon: EIcon;
  title: string;
  active?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    height: 74,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  activeContainer: {
    backgroundColor: COLORS.activeBackground,
    borderColor: COLORS.active,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 12,
    color: COLORS.text,
  },
  activeTitle: {
    color: COLORS.active,
  },
});
const DiscountButton: FC<TProps> = ({ icon, title, active, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <ShadowBlock>
        <View style={[styles.container, active ? styles.activeContainer : null]}>
          <Icon icon={icon} fill={active ? COLORS.active : COLORS.text} style={styles.icon} />
          <Text style={[styles.title, active ? styles.activeTitle : null]}>{title}</Text>
        </View>
      </ShadowBlock>
    </TouchableOpacity>
  );
};

export default DiscountButton;
