import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

type TProps = {
  title: string;
  value?: -1 | 0 | 1;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.blockBackground,
    gap: 12,
  },
  title: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  pickerContainer: {
    flexDirection: "row",
  },
  pickerIcon: {
    width: 14,
    height: 14,
  },
  pickerText: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.icon,
  },
  pickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "white",
    padding: 10,
  },
  pickerLeftButton: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.inputBorder,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    borderRightWidth: 0,
  },
  pickerMiddleButton: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  pickerRightButton: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    borderRightWidth: 1,
    borderRightColor: COLORS.inputBorder,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    borderLeftWidth: 0,
  },
});
const FeaturePicker: FC<TProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity activeOpacity={0.75} style={[styles.pickerButton, styles.pickerLeftButton]}>
          <Icon icon={EIcon.Plus} fill={COLORS.icon} style={styles.pickerIcon} />
          <Text style={styles.pickerText}>Есть</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} style={[styles.pickerButton, styles.pickerMiddleButton]}>
          <Icon icon={EIcon.Minus} fill={COLORS.icon} style={styles.pickerIcon} />
          <Text style={styles.pickerText}>Нет</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} style={[styles.pickerButton, styles.pickerRightButton]}>
          <Icon icon={EIcon.Question} fill={COLORS.icon} style={styles.pickerIcon} />
          <Text style={styles.pickerText}>Не знаю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeaturePicker;
