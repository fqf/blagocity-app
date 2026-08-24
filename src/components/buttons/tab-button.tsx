import { FC } from "react";
import { Href, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import EIcon from "@/models/enums/icon";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/components/icons/icon";

type TProps = {
  icon: EIcon;
  active?: boolean;
  href: Href;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
const TabButton: FC<TProps> = ({ icon, active, href, disabled }) => {
  const router = useRouter();
  const handleOnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then();
    router.navigate(href);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={[styles.container, disabled ? { opacity: 0.35 } : null]}
      onPress={handleOnPress}>
      <Icon icon={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default TabButton;
