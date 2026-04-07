import { FC } from "react";
import EGender from "@/models/enums/gender";
import EIcon from "@/models/enums/icon";
import MapIcon from "@/components/icons/map-icon";
import PercentIcon from "@/components/icons/percent-icon";
import BubbleIcon from "@/components/icons/bubble-icon";
import CheckedIcon from "@/components/icons/checked-icon";
import ChevronIcon from "@/components/icons/chevron-icon";
import ClansIcon from "@/components/icons/clans-icon";
import ClockIcon from "@/components/icons/clock-icon";
import CloseIcon from "@/components/icons/close-icon";
import DiscountIcon from "@/components/icons/discount-icon";
import FilterIcon from "@/components/icons/filter-icon";
import GearIcon from "@/components/icons/gear-icon";
import InfoIcon from "@/components/icons/info-icon";
import LikeIcon from "@/components/icons/like-icon";
import ListIcon from "@/components/icons/list-icon";
import LocationIcon from "@/components/icons/location-icon";
import MinusIcon from "@/components/icons/minus-icon";
import PhotoIcon from "@/components/icons/photo-icon";
import PinIcon from "@/components/icons/pin-icon";
import PlusIcon from "@/components/icons/plus-icon";
import ProfileIcon from "@/components/icons/profile-icon";
import QRCodeIcon from "@/components/icons/qr-code-icon";
import QuestionIcon from "@/components/icons/question-icon";
import QuitIcon from "@/components/icons/quit-icon";
import RingIcon from "@/components/icons/ring-icon";
import SearchIcon from "@/components/icons/search-icon";
import ShieldIcon from "@/components/icons/shield-icon";
import StarIcon from "@/components/icons/star-icon";
import StepArrowIcon from "@/components/icons/step-arrow-icon";
import UploadIcon from "@/components/icons/upload-icon";

type TProps = {
  icon: EIcon;
  fill?: string;
  opened?: boolean;
  gender?: EGender;
  direction?: "left" | "right" | "down";
  style?: object;
};

const Icon: FC<TProps> = ({ icon, fill, opened, gender, direction, style }) => {
  switch (icon) {
    case EIcon.Bubble:
      return <BubbleIcon style={style} />;

    case EIcon.Checked:
      return <CheckedIcon style={style} />;

    case EIcon.Chevron:
      return <ChevronIcon style={style} />;

    case EIcon.Clans:
      return <ClansIcon style={style} />;

    case EIcon.Clock:
      return <ClockIcon style={style} />;

    case EIcon.Close:
      return <CloseIcon style={style} />;

    case EIcon.Discount:
      return <DiscountIcon style={style} />;

    case EIcon.Filter:
      return <FilterIcon style={style} />;

    case EIcon.Gear:
      return <GearIcon style={style} />;

    case EIcon.Info:
      return <InfoIcon style={style} />;

    case EIcon.Like:
      return <LikeIcon style={style} />;

    case EIcon.List:
      return <ListIcon style={style} />;

    case EIcon.Location:
      return <LocationIcon style={style} />;

    case EIcon.Map:
      return <MapIcon style={style} />;

    case EIcon.Minus:
      return <MinusIcon style={style} />;

    case EIcon.Percent:
      return <PercentIcon style={style} />;

    case EIcon.Photo:
      return <PhotoIcon style={style} />;

    case EIcon.Pin:
      return <PinIcon style={style} />;

    case EIcon.Plus:
      return <PlusIcon fill={fill} style={style} />;

    case EIcon.Profile:
      return <ProfileIcon style={style} />;

    case EIcon.QRCode:
      return <QRCodeIcon style={style} />;

    case EIcon.Question:
      return <QuestionIcon style={style} />;

    case EIcon.Quit:
      return <QuitIcon style={style} />;

    case EIcon.Ring:
      return <RingIcon style={style} />;

    case EIcon.Search:
      return <SearchIcon style={style} />;

    case EIcon.Shield:
      return <ShieldIcon style={style} />;

    case EIcon.Star:
      return <StarIcon style={style} />;

    case EIcon.StepArrow:
      return <StepArrowIcon style={style} />;

    case EIcon.Upload:
      return <UploadIcon style={style} />;
  }
};

export default Icon;
