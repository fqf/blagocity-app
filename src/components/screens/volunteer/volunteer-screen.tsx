import { ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import Constants from "expo-constants";
import { FC } from "react";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import CallBlock from "@/components/blocks/call-block";

const incoming = [
  {
    id: 0,
    name: "Мария С.",
    time: "00:00",
    status: "incoming",
  },
  {
    id: 1,
    name: "Михаил В.",
    time: "00:00",
    status: "incoming",
  },
  {
    id: 3,
    name: "Евгений Р.",
    time: "00:00",
    status: "incoming",
  },
];
const accepted = [
  {
    id: 0,
    name: "Юрий Д.",
    time: "",
    status: "accepted",
  },
];
const rejected = [
  {
    id: 0,
    name: "Валерий З.",
    time: "",
    status: "rejected",
  },
  {
    id: 1,
    name: "Виктор Б.",
    time: "",
    status: "rejected",
  },
  {
    id: 2,
    name: "Наталья У.",
    time: "",
    status: "rejected",
  },
];

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Панель сотрудника</Text>
        <Text style={styles.headerDescription}>Кофейня "Зерно"</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollable} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Question} fill={COLORS.error} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>Ожидают помощи</Text>
          </View>
          {incoming.map(item => (
            <CallBlock
              key={item.id}
              name={item.name}
              time={item.time}
              status={item.status as any}
              onButtonPress={() => {}}
            />
          ))}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Success} fill={COLORS.success} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>В работе</Text>
          </View>
          {accepted.map(item => (
            <CallBlock
              key={item.id}
              name={item.name}
              time={item.time}
              status={item.status as any}
              onButtonPress={() => {}}
            />
          ))}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon icon={EIcon.Info} fill={COLORS.icon} style={styles.sectionHeaderIcon} />
            <Text style={styles.sectionHeaderText}>Отменены</Text>
          </View>
          {rejected.map(item => (
            <CallBlock
              key={item.id}
              name={item.name}
              time={item.time}
              status={item.status as any}
              onButtonPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VolunteerScreen;
