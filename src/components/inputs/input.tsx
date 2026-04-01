import { FC, useEffect, useState } from "react";
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
  error?: string;
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
  error,
  onFocus,
  onChange,
  onBlur,
  onButtonPress,
}) => {
  const [status, setStatus] = useState<"unfocused" | "focused" | "error">("unfocused");
  const handleOnFocus = () => {
    if (!error) {
      setStatus("focused");
    }

    onFocus?.();
  };
  const handleOnBlur = (e: NativeSyntheticEvent<any>) => {
    if (!error) {
      setStatus("unfocused");
    }

    onBlur?.(e);
  };
  const handleOnChange = (text: string, onChange?: (text: string) => void) => {
    setStatus("focused");
    onChange?.(text);
  };

  useEffect(() => {
    if (error) {
      setStatus("error");
    }
  }, [error]);

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
          style={[
            styles.input,
            status === "focused"
              ? { borderColor: COLORS.active, backgroundColor: "white" }
              : status === "error"
                ? { borderColor: COLORS.error, backgroundColor: chroma(COLORS.error).alpha(0.1).hex() }
                : null,
          ]}
          onChangeText={(text: string) => handleOnChange(text, onChange)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default Input;
