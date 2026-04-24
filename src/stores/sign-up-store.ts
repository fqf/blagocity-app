import { create } from "zustand";
import EGender from "@/models/enums/gender";
import { Dayjs } from "dayjs";
import { TAvatarType } from "@/components/buttons/avatar-button";

type TState = {
  name: string;
  password: string;
  avatar?: TAvatarType;
  gender?: EGender;
  dob?: Dayjs;
};
type TActions = {
  reset: () => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setAvatar: (avatar: TAvatarType) => void;
  setGender: (gender: EGender) => void;
  setDOB: (dob: Dayjs) => void;
};

const initialState: TState = {
  name: "",
  password: "",
};
const useSignUpStore = create<TState & TActions>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setName: (name: string) => set(() => ({ name })),
  setPassword: (password: string) => set(() => ({ password })),
  setAvatar: (avatar: TAvatarType) => set(() => ({ avatar })),
  setGender: (gender: EGender) => set(() => ({ gender })),
  setDOB: (dob: Dayjs) => set(() => ({ dob })),
}));

export default useSignUpStore;
