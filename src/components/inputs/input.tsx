import { FC, useState } from "react";
import { BlurEvent, StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

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
  onFocus: () => void;
  onChange: (text: string) => void;
  onBlur: (e: BlurEvent) => void;
  onButtonPress: () => void;
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
    fontSize: 18,
    color: COLORS.text,
    opacity: 0.25,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
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
  disabled,
  unit,
  error,
  onFocus,
  onChange,
  onBlur,
  onButtonPress,
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
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={chroma(COLORS.label).alpha(0.5).hex()}
          value={value}
          inputMode={inputMode}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          readOnly={disabled}
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
        {!!unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
