import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";
import Avatar from "@/components/others/avatar";
import Preloader from "@/components/others/preloader";

export type TAvatarType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TProps = {
  type: TAvatarType;
  active?: boolean;
  disabled?: boolean;
  size?: "large" | "small";
  pending?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 157,
    height: 157,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  smallContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
  },
  content: {
    width: 145,
    height: 145,
    position: "absolute",
  },
  smallContent: {
    width: 44,
    height: 44,
  },
  active: {
    backgroundColor: chroma(COLORS.active).alpha(0.5).hex(),
  },
  content_1: {
    bottom: 12,
  },
  smallContent_1: {
    bottom: 5,
  },
  content_2: {
    bottom: 12,
  },
  smallContent_2: {
    bottom: 5,
  },
  content_3: {
    bottom: 9,
  },
  smallContent_3: {
    bottom: 4,
  },
  content_4: {},
  smallContent_4: {},
  content_5: {},
  smallContent_5: {},
  content_6: {},
  smallContent_6: {},
  content_7: {},
  smallContent_7: {},
  content_8: {},
  smallContent_8: {},
});
const AvatarButton: FC<TProps> = ({ type = 1, active, disabled, size = "large", pending, onPress }) => {
  if (pending) {
    return (
      <View style={[styles.container, size === "small" ? styles.smallContainer : null]}>
        <Preloader size={size === "small" ? 100 : 200} />
      </View>
    );
  }

  if (size === "small") {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.75}
        style={[styles.container, styles.smallContainer]}
        onPress={onPress}>
        <View style={[styles.content, styles.smallContent, styles[`smallContent_${type}`]]}>
          <Avatar type={type} size={size} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[styles.container, active ? styles.active : null]}
      onPress={onPress}>
      <View style={[styles.content, styles[`content_${type}`]]}>
        <Avatar type={type} size={size} />
      </View>
    </TouchableOpacity>
  );
};

export default AvatarButton;
