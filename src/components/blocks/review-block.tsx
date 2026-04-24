import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Tag from "@/components/others/tag";
import COLORS from "@/constants/colors";
import Rating from "@/components/others/rating";
import Avatar from "@/components/others/avatar";
import dayjs from "dayjs";
import { TAvatarType } from "@/components/buttons/avatar-button";
import ShadowBlock from "@/components/blocks/shadow-block";

type TProps = {
  user: string;
  avatar: TAvatarType;
  rating: number;
  date: Date;
  text: string;
  features: string[];
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.inputBorder,
    gap: 12,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userName: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  date: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.label,
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  footer: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    paddingTop: 12,
  },
});
const ReviewBlock: FC<TProps> = ({ user, avatar, rating, date, text, features }) => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSection}>
            <Avatar type={avatar} size="small" />
            <View>
              <Text style={styles.userName}>{user}</Text>
              <Text style={styles.date}>{dayjs(date).locale("ru").format("DD MMMM YYYY")}</Text>
            </View>
          </View>
          <Rating value={rating} />
        </View>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.footer}>
          {features.map((feature, i) => (
            <Tag key={i} text={feature} variant="success" />
          ))}
        </View>
      </View>
    </ShadowBlock>
  );
};

export default ReviewBlock;
