import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import { Href, useRouter } from "expo-router";

type TProps = {
  href?: Href;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
    marginBottom: 30,
  },
});
const PinButton: FC<TProps> = ({ href, onPress }) => {
  const router = useRouter();
  const handleOnPress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleOnPress}>
      <Icon icon={EIcon.PinFilled} fill="white" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default PinButton;
