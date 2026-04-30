import { FC, useState } from "react";
import { BlurEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";
import EIcon from "@/models/enums/icon";
import Icon from "@/components/icons/icon";
import { TextInputMask } from "react-native-masked-text";

type TProps = Partial<{
  label: string;
  placeholder: string;
  value: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  multiline: boolean;
  autoCapitalize: "characters" | "words" | "sentences" | "none";
  keyboardType: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url";
  isSecure: boolean;
  disabled: boolean;
  unit: string;
  error: string;
  icon: EIcon;
  mask: string;
  maskType: "custom" | "datetime" | "cel-phone" | "credit-card" | "money" | "only-numbers";
  maskOptions: object;
  maxLength: number;
  onIconPress: () => void;
  onFocus: () => void;
  onChange: (text: string) => void;
  onBlur: (e: BlurEvent) => void;
}>;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
  },
  content: {
    justifyContent: "center",
  },
  label: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  unit: {
    position: "absolute",
    right: 12,
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.25,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
  },
  iconButton: {
    width: 42,
    height: 42,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
const Input: FC<TProps> = ({
  label,
  placeholder,
  value,
  inputMode,
  multiline,
  autoCapitalize,
  keyboardType,
  isSecure,
  disabled,
  unit,
  error,
  icon,
  maskType,
  maskOptions,
  maxLength,
  onIconPress,
  onFocus,
  onChange,
  onBlur,
}) => {
  const [focused, setFocused] = useState(false);
  const handleOnFocus = () => {
    setFocused(true);
    onFocus?.();
  };
  const handleOnBlur = (e: BlurEvent) => {
    setFocused(false);
    onBlur?.(e);
  };
  const handleOnChange = (text: string, onChange?: (text: string) => void) => {
    setFocused(true);
    onChange?.(text);
  };

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.content}>
        {!!maskType && (
          <TextInputMask
            type={maskType}
            options={maskOptions}
            placeholder={placeholder}
            placeholderTextColor={error ? chroma(COLORS.error).alpha(0.5).hex() : chroma(COLORS.label).alpha(0.5).hex()}
            value={value}
            inputMode={inputMode}
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            readOnly={disabled}
            maxLength={maxLength}
            style={[
              styles.input,
              focused ? { borderColor: COLORS.active, backgroundColor: "white" } : null,
              multiline ? { height: 122, verticalAlign: "top" } : null,
              error ? { borderColor: COLORS.error, backgroundColor: chroma(COLORS.error).alpha(0.1).hex() } : null,
            ]}
            onChangeText={(text: string) => handleOnChange(text, onChange)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        )}
        {!maskType && (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={error ? chroma(COLORS.error).alpha(0.5).hex() : chroma(COLORS.label).alpha(0.5).hex()}
            value={value}
            inputMode={inputMode}
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={isSecure}
            readOnly={disabled}
            style={[
              styles.input,
              focused ? { borderColor: COLORS.active, backgroundColor: "white" } : null,
              multiline ? { height: 122, verticalAlign: "top" } : null,
              icon ? { paddingRight: 36 } : null,
              error ? { borderColor: COLORS.error, backgroundColor: chroma(COLORS.error).alpha(0.1).hex() } : null,
            ]}
            onChangeText={(text: string) => handleOnChange(text, onChange)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        )}

        {!unit && icon && (
          <TouchableOpacity activeOpacity={0.75} onPress={onIconPress} style={styles.iconButton}>
            <Icon icon={icon} fill={COLORS.icon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {!!unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
