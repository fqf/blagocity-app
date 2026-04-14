import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  uploadButton: {
    width: "100%",
    height: 128,
    backgroundColor: COLORS.inputBackground,
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
const PhotoUploadBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Фотография</Text>
        <TouchableOpacity activeOpacity={0.75} style={styles.uploadButton}>
          <Icon icon={EIcon.Photo} fill={COLORS.icon} style={styles.icon} />
          <Text style={styles.text}>Добавить фото</Text>
        </TouchableOpacity>
      </View>
    </ShadowBlock>
  );
};

export default PhotoUploadBlock;
