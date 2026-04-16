import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";
import Avatar from "@/components/others/avatar";

export type TAvatarType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TProps = {
  type: TAvatarType;
  active?: boolean;
  disabled?: boolean;
  size?: "large" | "small";
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  smallContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
  },
  active: {
    backgroundColor: chroma(COLORS.active).alpha(0.5).hex(),
  },
  container_1: {
    paddingBottom: 10,
  },
  smallContainer_1: {
    paddingBottom: 2,
  },
  container_2: {
    paddingBottom: 12,
  },
  smallContainer_2: {
    paddingBottom: 3,
  },
  container_3: {
    paddingBottom: 6,
  },
  smallContainer_3: {
    paddingBottom: 1.5,
  },
  container_4: {},
  smallContainer_4: {},
  container_5: {},
  smallContainer_5: {},
  container_6: {},
  smallContainer_6: {},
  container_7: {},
  smallContainer_7: {},
  container_8: {},
  smallContainer_8: {},
  image: {
    width: 145,
    height: 145,
    position: "absolute",
  },
  smallImage: {
    width: 44,
    height: 44,
  },
});
const AvatarButton: FC<TProps> = ({ type = 1, active, disabled, size = "large", onPress }) => {
  if (size === "small") {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.75}
        style={[styles.container, styles.smallContainer, styles[`smallContainer_${type}`]]}
        onPress={onPress}>
        <Avatar type={type} size={size} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[styles.container, styles[`container_${type}`], active ? styles.active : null]}
      onPress={onPress}>
      <Avatar type={type} size={size} />
    </TouchableOpacity>
  );
};

export default AvatarButton;
