import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

type TProps = {
  uri: string;
  onDeletePress: () => void;
};

const styles = StyleSheet.create({
  container: {},
  button: {
    position: "absolute",
    width: 24,
    height: 24,
    backgroundColor: COLORS.error,
    zIndex: 1,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    right: -12,
    top: -12,
  },
  icon: {
    width: 16,
    height: 16,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});
const ImagePreview: FC<TProps> = ({ uri, onDeletePress }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.75} style={styles.button} onPress={onDeletePress}>
        <Icon icon={EIcon.Close} fill="white" style={styles.icon} />
      </TouchableOpacity>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

export default ImagePreview;
