import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

export type TAvatarType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TProps = {
  type: TAvatarType;
  active?: boolean;
  disabled?: boolean;
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
  active: {
    backgroundColor: chroma(COLORS.active).alpha(0.5).hex(),
  },
  container_1: {
    paddingBottom: 10,
  },
  container_2: {
    paddingBottom: 12,
  },
  container_3: {
    paddingBottom: 6,
  },
  container_4: {},
  container_5: {},
  container_6: {},
  container_7: {},
  container_8: {},
  image: {
    width: 145,
    height: 145,
  },
});
const AvatarButton: FC<TProps> = ({ type = 1, active, disabled, onPress }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[styles.container, styles[`container_${type}`], active ? styles.active : null]}
      onPress={onPress}>
      <Image source={{ uri: `avatar_${type}` }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default AvatarButton;
