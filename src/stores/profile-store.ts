import { create } from "zustand";
import TCreateUserResponse from "@/models/contracts/user/createUserResponse";

type TState = {
  userData?: TCreateUserResponse;
};
type TActions = {
  reset: () => void;
  setUserData: (userData: TCreateUserResponse) => void;
};

const initialState: TState = {
  userData: undefined,
};
const useProfileStore = create<TState & TActions>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setUserData: (userData: TCreateUserResponse) => set(() => ({ userData })),
}));

export default useProfileStore;
