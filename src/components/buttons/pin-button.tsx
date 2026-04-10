import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import { Href, useRouter } from "expo-router";

type TProps = {
  href: Href;
};

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
});
const PinButton: FC<TProps> = ({ href }) => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push(href);
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleOnPress}>
      <Icon icon={EIcon.Pin} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default PinButton;
