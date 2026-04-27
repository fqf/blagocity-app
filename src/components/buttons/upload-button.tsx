import { FC } from "react";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  uploadButton: {
    width: "100%",
    height: 128,
    backgroundColor: COLORS.blockBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderStyle: "dashed",
    gap: 4,
  },
  icon: {
    width: 28,
    height: 28,
  },
  text: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 14,
    color: COLORS.active,
  },
});
const UploadButton: FC = () => {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.uploadButton}>
      <Icon icon={EIcon.Photo} fill={COLORS.icon} style={styles.icon} />
      <Text style={styles.text}>Добавить фото</Text>
    </TouchableOpacity>
  );
};

export default UploadButton;
