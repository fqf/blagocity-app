import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Button from "@/components/buttons/button";
import TGetAccessibilityListResponse from "@/models/contracts/accessibility/get-accessibility-list-response";
import { getAccessibilityList } from "@/actions/accesibility-actions";
import Skeleton from "@/components/others/skeleton";
import processError from "@/lib/process-error";

type TProps = Partial<{
  value: string[];
  error: string;
  disabled: boolean;
  onPress: (value: string) => void;
}>;

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
  content: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skeleton: {
    width: 100,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
  },
});
const AccessibleEnvironmentBlock: FC<TProps> = ({ value, error, disabled, onPress }) => {
  const [pending, setPending] = useState(true);
  const [accessibility, setAccessibility] = useState<TGetAccessibilityListResponse>([]);

  useEffect(() => {
    (async () => {
      setPending(true);

      try {
        const response = await getAccessibilityList();
        setAccessibility(response);
      } catch (e: unknown) {
        await processError(e);
      }

      setPending(false);
    })();
  }, []);

  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Доступная среда</Text>
        <View style={styles.content}>
          {pending && (
            <>
              <Skeleton style={styles.skeleton} />
              <Skeleton style={styles.skeleton} />
              <Skeleton style={styles.skeleton} />
            </>
          )}
          {!pending &&
            accessibility.map(acc => (
              <Button
                key={acc.guid}
                type="outlined"
                theme={error ? "error" : value?.includes(acc.guid) ? "active" : "default"}
                disabled={disabled}
                text={acc.name}
                onPress={() => onPress?.(acc.guid)}
              />
            ))}
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ShadowBlock>
  );
};

export default AccessibleEnvironmentBlock;
