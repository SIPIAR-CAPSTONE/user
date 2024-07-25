import { create } from "zustand";
import { createProfileSlice } from "../zustand/profileSlice";
import { createAuthSlice } from "./authSlice";
import { createUtilSlice } from "./utilSlice"; 
const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createAuthSlice(...a),
  ...createUtilSlice(...a)
}));

export default useBoundStore;
