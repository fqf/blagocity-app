import { FC, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, View } from "react-native";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

type TProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  multiline?: boolean;
  autoCapitalize?: "characters" | "words" | "sentences" | "none";
  keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url";
  isSecure?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onChange?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onButtonPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    gap: 4,
  },
  label: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 15,
    height: 63,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    fontFamily: "LexendDeca-Regular",
    fontSize: 18,
    color: COLORS.text,
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
  onFocus,
  onChange,
  onBlur,
  onButtonPress,
}) => {
  const [status, setStatus] = useState<"unfocused" | "focused" | "error">("unfocused");
  const handleOnFocus = () => {
    setStatus("focused");
    onFocus?.();
  };
  const handleOnBlur = (e: NativeSyntheticEvent<any>) => {
    setStatus("unfocused");
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={chroma(COLORS.label).alpha(0.5).hex()}
          value={value}
          inputMode={inputMode}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          readOnly={disabled}
          style={[styles.input, status === "focused" ? { borderColor: COLORS.active, backgroundColor: "white" } : null]}
          onChangeText={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </View>
    </View>
  );
};

export default Input;
