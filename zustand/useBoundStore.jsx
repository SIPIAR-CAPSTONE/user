import { create } from "zustand";
import { createProfileSlice } from "../zustand/profileSlice";
import { createAuthSlice } from "./authSlice";

const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createAuthSlice(...a),
}));

export default useBoundStore;
