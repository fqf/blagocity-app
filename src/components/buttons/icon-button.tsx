import { FC, RefObject } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@/components/icons/icon";
import { BlurView } from "expo-blur";
import chroma from "chroma-js";

type TProps = {
  icon: EIcon;
  blurred?: boolean;
  fill?: string;
  blurTarget?: RefObject<View | null> | undefined;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  notBlurred: {
    backgroundColor: chroma("white").alpha(0.25).hex(),
  },
  blurred: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
const IconButton: FC<TProps> = ({ icon, blurred = true, fill = "white", blurTarget, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, !blurred ? styles.notBlurred : null]}
      activeOpacity={0.75}
      onPress={onPress}>
      {blurred && (
        <BlurView
          intensity={30}
          blurReductionFactor={12}
          blurMethod="dimezisBlurViewSdk31Plus"
          blurTarget={blurTarget}
          style={styles.blurred}>
          <Icon icon={icon} fill={fill} style={styles.icon} />
        </BlurView>
      )}
      {!blurred && <Icon icon={icon} fill={fill} style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default IconButton;
