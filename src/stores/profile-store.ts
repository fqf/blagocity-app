import { create } from "zustand";
import TGetUserResponse from "@/models/contracts/user/get-user-response";

type TState = {
  userData?: TGetUserResponse;
};
type TActions = {
  reset: () => void;
  setUserData: (userData: TGetUserResponse) => void;
};

const initialState: TState = {
  userData: undefined,
};
const useProfileStore = create<TState & TActions>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setUserData: (userData: TGetUserResponse) => set(() => ({ userData })),
}));

export default useProfileStore;
