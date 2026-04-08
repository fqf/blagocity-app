import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShadowBlock from "@/components/others/shadow-block";
import { Image } from "expo-image";
import COLORS from "@/constants/colors";
import EIcon from "@/models/enums/icon";
import Icon from "@/components/icons/icon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    height: 98,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 68,
    height: 68,
  },
  text: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 17,
    color: COLORS.text,
  },
  button: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
const ProfileBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={{ uri: "avatar_1" }} style={styles.avatar} />
          <Text style={styles.text}>Вася В.</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Icon icon={EIcon.Gear} fill={COLORS.label} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ShadowBlock>
  );
};

export default ProfileBlock;
