import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AvatarButton, { TAvatarType } from "@/components/buttons/avatar-button";
import COLORS from "@/constants/colors";

type TProps = Partial<{
  value: string;
  error: string;
  disabled: boolean;
  onPick: (value: string) => void;
}>;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  avatars: {
    gap: 4,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.active,
  },
  errorLabel: {
    color: COLORS.error,
  },
});
const AvatarPicker: FC<TProps> = ({ value, error, disabled, onPick }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={new Array(8).fill("").map((_, i) => (i + 1) as TAvatarType)}
        renderItem={({ item }) => (
          <AvatarButton
            type={item}
            active={value === item.toString()}
            disabled={disabled}
            onPress={() => onPick?.(item.toString())}
          />
        )}
        keyExtractor={i => i.toString()}
        contentContainerStyle={styles.avatars}
      />
      <Text style={[styles.label, error ? styles.errorLabel : null]}>Выберите аватар</Text>
    </View>
  );
};

export default AvatarPicker;
