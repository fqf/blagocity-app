import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import Rating from "@/components/others/rating";
import Avatar from "@/components/others/avatar";
import dayjs from "dayjs";
import ShadowBlock from "@/components/blocks/shadow-block";
import { getReview } from "@/actions/review-actions";
import Skeleton from "@/components/others/skeleton";
import TGetReviewResponse from "@/models/contracts/review/get-review-response";
import TGetUserResponse from "@/models/contracts/user/get-user-response";
import { getUser } from "@/actions/user-actions";
import * as SecureStore from "expo-secure-store";
import { TAvatarType } from "@/components/buttons/avatar-button";
import Tag from "@/components/others/tag";
import { getAccessibility } from "@/actions/accesibility-actions";
import processError from "@/lib/process-error";
import { Image } from "expo-image";
import { getMedia } from "@/actions/media-actions";
import * as WebBrowser from "expo-web-browser";

type TProps = {
  guid: string;
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
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    paddingTop: 12,
  },
  avatarSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  nameSkeleton: {
    width: 60,
    height: 20,
    borderRadius: 6,
  },
  dateSkeleton: {
    width: 80,
    height: 16,
    borderRadius: 6,
    marginTop: 4,
  },
  ratingSkeleton: {
    width: 40,
    height: 24,
    borderRadius: 6,
  },
  textSkeleton: {
    height: 40,
    borderRadius: 6,
  },
  tagSkeleton: {
    width: 37,
    height: 15,
    borderRadius: 6,
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  photo: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});
const ReviewBlock: FC<TProps> = ({ guid }) => {
  const [pending, setPending] = useState(true);
  const [review, setReview] = useState<TGetReviewResponse>();
  const [author, setAuthor] = useState<TGetUserResponse>();
  const [photos, setPhotos] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<{ guid: string; name: string; value?: boolean }[]>([]);
  const handleOnPhotoPress = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  useEffect(() => {
    if (guid) {
      (async () => {
        try {
          const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

          if (!token) {
            throw new Error("Bad token");
          }

          const reviewResponse = await getReview(guid);
          setReview(reviewResponse);

          const userResponse = await getUser(token, reviewResponse.author.split("/").slice(-1)[0]);
          setAuthor(userResponse);

          if (reviewResponse.photos.length) {
            for (const photo of reviewResponse.photos) {
              const photoResponse = await getMedia(photo.split("/").slice(-1)[0]);
              setPhotos(prev => [...prev, photoResponse.path]);
            }
          }

          const accessibilityResponse = await Promise.all(
            reviewResponse.accessibilityCriteria.map(async acc => {
              const accessibilityData = await getAccessibility(acc.criterion.split("/").slice(-1)[0]);

              return {
                guid: accessibilityData.guid,
                name: accessibilityData.name,
                value: acc.value,
              };
            }),
          );

          setAccessibility(accessibilityResponse);
          setPending(false);
        } catch (e: unknown) {
          await processError(e);
        }
      })();
    }
  }, [guid]);

  return (
    <ShadowBlock>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSection}>
            {pending && <Skeleton style={styles.avatarSkeleton} />}
            {!pending && <Avatar type={+(author?.avatar ?? 1) as TAvatarType} size="small" />}
            <View>
              {pending && <Skeleton style={styles.nameSkeleton} />}
              {!pending && <Text style={styles.userName}>{author?.name}</Text>}
              {pending && <Skeleton style={styles.dateSkeleton} />}
              {!pending && (
                <Text style={styles.date}>{dayjs(review?.reviewedAt).locale("ru").format("DD MMMM YYYY")}</Text>
              )}
            </View>
          </View>
          {pending && <Skeleton style={styles.ratingSkeleton} />}
          {!pending && <Rating value={review?.rating ?? 0} />}
        </View>
        {pending && <Skeleton style={styles.textSkeleton} />}
        {!pending && <Text style={styles.text}>{review?.text}</Text>}
        {!pending && !!photos.length && (
          <View style={styles.photosContainer}>
            {photos.map((photo, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.75}
                onPress={() => handleOnPhotoPress(`https://blagocity.ru${photo}`)}>
                <Image source={{ uri: `https://blagocity.ru${photo}` }} style={styles.photo} />
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.footer}>
          {pending && (
            <>
              <Skeleton style={styles.tagSkeleton} />
              <Skeleton style={styles.tagSkeleton} />
              <Skeleton style={styles.tagSkeleton} />
            </>
          )}
          {!pending &&
            accessibility.map(acc => (
              <Tag
                key={acc.guid}
                text={acc.name}
                variant={acc.value === undefined ? "default" : acc.value ? "success" : "error"}
              />
            ))}
        </View>
      </View>
    </ShadowBlock>
  );
};

export default ReviewBlock;
