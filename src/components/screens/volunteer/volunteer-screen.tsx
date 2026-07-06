import { ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import Constants from "expo-constants";
import { FC, useEffect, useState } from "react";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import CallBlock from "@/components/blocks/call-block";
import { useSearchParams } from "expo-router/build/hooks";
import Button from "@/components/buttons/button";
import { useRouter } from "expo-router";
import useProfileStore from "@/stores/profile-store";
import * as SecureStore from "expo-secure-store";
import { getCallsList, setCallStatus } from "@/actions/call-actions";
import TGetCallsListResponse from "@/models/contracts/call/get-calls-list-response";
import { getPlace } from "@/actions/place-actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: Constants.statusBarHeight + 12,
    paddingBottom: 32,
    gap: 4,
  },
  headerTitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
  },
  headerDescription: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 12,
    color: COLORS.text,
    textAlign: "center",
  },
  scrollable: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionHeaderIcon: {
    width: 16,
    height: 16,
  },
  sectionHeaderText: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.icon,
    textTransform: "uppercase",
  },
});
const VolunteerScreen: FC = () => {
  const [establishment, setEstablishment] = useState("");
  const [list, setList] = useState<TGetCallsListResponse>([]);
  const params = useSearchParams();
  const router = useRouter();
  const { userData, reset } = useProfileStore();
  const handleOnLogOutPress = async () => {
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);
    await SecureStore.deleteItemAsync("BLAGOCITY_VOLUNTEER_ESTABLISHMENT_GUID");
    router.replace("/auth/sign-in");
    reset();
  };
  const handleOnButtonPress = async (guid: string, status: "accepted" | "completed") => {
    const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

    if (!token) {
      return;
    }

    //await takeCall(token, userData?.guid ?? "");
    await setCallStatus(token, guid, status);
    const establishmentGuid = params.get("establishment");
    const callsListData = await getCallsList(token);
    setList(callsListData.filter(item => item.establishment.split("/")[3] === establishmentGuid));
  };

  useEffect(() => {
    const establishmentGuid = params.get("establishment");
    const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

    (async () => {
      if (token && establishmentGuid) {
        const place = await getPlace(establishmentGuid);
        setEstablishment(`${place.placeType.name} "${place.name}"`);

        const callsListData = await getCallsList(token);
        setList(callsListData.filter(item => item.establishment.split("/")[3] === establishmentGuid));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Панель сотрудника</Text>
        <Text style={styles.headerDescription}>{establishment}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollable} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Question} fill={COLORS.error} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>Ожидают помощи</Text>
          </View>
          {list
            .filter(item => item.status === "new")
            .map(item => (
              <CallBlock
                key={item.guid}
                name={item.author.split("/")[3]}
                time={item.calledAt}
                status="incoming"
                onButtonPress={() => handleOnButtonPress(item.guid, "accepted")}
              />
            ))}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Success} fill={COLORS.success} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>В работе</Text>
          </View>
          {list
            .filter(item => item.status === "accepted")
            .map(item => (
              <CallBlock
                key={item.guid}
                name={item.author.split("/")[3]}
                time={item.calledAt}
                status="accepted"
                onButtonPress={() => handleOnButtonPress(item.guid, "completed")}
              />
            ))}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Info} fill={COLORS.icon} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>Отменены</Text>
          </View>
          {list
            .filter(item => item.status === "rejected")
            .map(item => (
              <CallBlock
                key={item.guid}
                name={item.author.split("/")[3]}
                time={item.calledAt}
                status="rejected"
                onButtonPress={() => {}}
              />
            ))}
        </View>
        <Button type="primary" theme="error" text="Выход" onPress={handleOnLogOutPress} />
      </ScrollView>
    </View>
  );
};

export default VolunteerScreen;
