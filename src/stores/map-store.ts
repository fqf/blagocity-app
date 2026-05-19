import { create } from "zustand";
import TGetPlacesListResponse from "@/models/contracts/place/get-places-list-response";

type TState = {
  placesList?: TGetPlacesListResponse;
};
type TActions = {
  reset: () => void;
  setPlacesList: (placesList: TGetPlacesListResponse) => void;
};

const initialState: TState = {
  placesList: undefined,
};
const useMapStore = create<TState & TActions>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setPlacesList: (placesList: TGetPlacesListResponse) => set(() => ({ placesList })),
}));

export default useMapStore;
