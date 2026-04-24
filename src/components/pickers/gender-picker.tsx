import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/buttons/button";
import COLORS from "@/constants/colors";
import EGender from "@/models/enums/gender";

type TProps = {
  value?: EGender;
  error?: string;
  disabled?: boolean;
  onPick?: (value: EGender) => void;
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
  },
});
const GenderPicker: FC<TProps> = ({ value, error, disabled, onPick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ваш пол</Text>
      <View style={styles.buttons}>
        <Button
          disabled={disabled}
          fullWidth
          type="outlined"
          text="Мужской"
          active={value === EGender.Male}
          error={!!error}
          onPress={() => onPick?.(EGender.Male)}
        />
        <Button
          disabled={disabled}
          fullWidth
          type="outlined"
          text="Женский"
          active={value === EGender.Female}
          error={!!error}
          onPress={() => onPick?.(EGender.Female)}
        />
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default GenderPicker;
