import { create } from "zustand";
import { createProfileSlice } from "../zustand/profileSlice";
import { createAuthSlice } from "./authSlice";
import { createUtilSlice } from "./utilSlice";
import { createThemeSlice } from "./themeSlice";
import { createContactSlice } from "./contactSlice";

const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createAuthSlice(...a),
  ...createUtilSlice(...a),
  ...createThemeSlice(...a),
  ...createContactSlice(...a),
}));

export default useBoundStore;
