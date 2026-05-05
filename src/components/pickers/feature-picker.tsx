import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

export type TFeaturePickerValue = -1 | 0 | 1;
type TProps = {
  guid: string;
  title: string;
  value?: TFeaturePickerValue;
  error?: boolean;
  disabled?: boolean;
  onPick?: (guid: string, value: TFeaturePickerValue) => void;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.blockBackground,
    gap: 12,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBackground,
  },
  title: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  errorTitle: {
    color: COLORS.error,
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
  activeButton: {
    borderLeftColor: COLORS.active,
    borderTopColor: COLORS.active,
    borderRightColor: COLORS.active,
    borderBottomColor: COLORS.active,
    backgroundColor: COLORS.active,
  },
  activeText: {
    color: "white",
  },
});
const FeaturePicker: FC<TProps> = ({ guid, title, value, error, disabled, onPick }) => {
  return (
    <View style={[styles.container, error ? styles.errorContainer : null]}>
      <Text style={[styles.title, error ? styles.errorTitle : null]}>{title}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.75}
          style={[styles.pickerButton, styles.pickerLeftButton, value === 1 ? styles.activeButton : null]}
          onPress={() => onPick?.(guid, 1)}>
          <Icon icon={EIcon.Plus} fill={value === 1 ? "white" : COLORS.icon} style={styles.pickerIcon} />
          <Text style={[styles.pickerText, value === 1 ? styles.activeText : null]}>Есть</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.75}
          style={[styles.pickerButton, styles.pickerMiddleButton, value === -1 ? styles.activeButton : null]}
          onPress={() => onPick?.(guid, -1)}>
          <Icon icon={EIcon.Minus} fill={value === -1 ? "white" : COLORS.icon} style={styles.pickerIcon} />
          <Text style={[styles.pickerText, value === -1 ? styles.activeText : null]}>Нет</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.75}
          style={[styles.pickerButton, styles.pickerRightButton, value === 0 ? styles.activeButton : null]}
          onPress={() => onPick?.(guid, 0)}>
          <Icon icon={EIcon.Question} fill={value === 0 ? "white" : COLORS.icon} style={styles.pickerIcon} />
          <Text style={[styles.pickerText, value === 0 ? styles.activeText : null]}>Не знаю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeaturePicker;
