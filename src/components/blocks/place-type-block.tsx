import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Button from "@/components/buttons/button";
import Skeleton from "@/components/others/skeleton";
import { getPlaceTypesList } from "@/actions/place-actions";
import TGetPlaceTypesListResponse from "@/models/contracts/place/get-place-types-list-response";
import processError from "@/lib/process-error";

type TProps = Partial<{
  value: string;
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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
const PlaceTypeBlock: FC<TProps> = ({ value, error, disabled, onPress }) => {
  const [pending, setPending] = useState(true);
  const [types, setTypes] = useState<TGetPlaceTypesListResponse>([]);

  useEffect(() => {
    (async () => {
      setPending(true);

      try {
        const response = await getPlaceTypesList();
        setTypes(response);
      } catch (e: unknown) {
        await processError(e);
      }

      setPending(false);
    })();
  }, []);

  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Тип места</Text>
        <View style={styles.content}>
          {pending && (
            <>
              <Skeleton style={styles.skeleton} />
              <Skeleton style={styles.skeleton} />
              <Skeleton style={styles.skeleton} />
            </>
          )}
          {!pending &&
            types.map(type => (
              <Button
                key={type.guid}
                type="secondary"
                theme={error ? "error" : type.guid === value ? "active" : "default"}
                text={type.name}
                disabled={disabled}
                onPress={() => onPress?.(type.guid)}
              />
            ))}
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ShadowBlock>
  );
};

export default PlaceTypeBlock;
