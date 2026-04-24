import { FC } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { TAvatarType } from "@/components/buttons/avatar-button";

type TProps = {
  type: TAvatarType;
  size?: "large" | "small";
};

const styles = StyleSheet.create({
  image: {
    width: 145,
    height: 145,
  },
  smallImage: {
    width: 44,
    height: 44,
  },
});
const Avatar: FC<TProps> = ({ type, size }) => {
  return (
    <Image source={{ uri: `avatar_${type}` }} style={[styles.image, size === "small" ? styles.smallImage : null]} />
  );
};

export default Avatar;
