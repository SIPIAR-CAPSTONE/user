import { create } from "zustand";
import { createProfileSlice } from "../zustand/profileSlice";
import { createAuthSlice } from "./authSlice";
import { createUtilSlice } from "./utilSlice";
import { createCprSlice } from "./cprSlice";
import { createThemeSlice } from "./themeSlice";

const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createAuthSlice(...a),
  ...createUtilSlice(...a),
  ...createCprSlice(...a),
  ...createThemeSlice(...a),
}));

export default useBoundStore;
