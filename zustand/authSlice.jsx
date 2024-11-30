import { LargeSecureStore } from "../utils/SecureLocalStorage";
import { supabase } from "../utils/supabase/config";

const DEFAULT_SIGNUP_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  birthday: new Date(),
  phone: 0,
  barangay: "",
  street: "",
  houseNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const createAuthSlice = (set) => ({
  session: null,
  resetPasswordSession: null,
  appIsReady: false,
  passwordResetEmail: "",
  signupForm: DEFAULT_SIGNUP_FORM,
  signupCurrentStep: 0,
  userMetaData: {
    bystanderId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: new Date(),
    phone: 0,
    barangay: "",
    street: "",
    houseNumber: "",
    email: "",
  },
  goSignupNextStep: () =>
    set((state) => ({
      signupCurrentStep: state.signupCurrentStep + 1,
    })),
  setSignupForm: (key, newValue) =>
    set((state) => ({
      signupForm: { ...state.signupForm, [key]: newValue },
    })),
  setPasswordResetEmail: (value) => set({ passwordResetEmail: value }),
  setSession: (encryptedSession) => {
    set({ session: encryptedSession });
  },
  restoreSession: async () => {
    const largeSecureStore = new LargeSecureStore();

    const { data } = await supabase.auth.getSession();
    if (data && data.session) {
      const sessionUserMetaData = data.session["user"]["user_metadata"];
      set({
        userMetaData: {
          firstName: sessionUserMetaData["first_name"],
          middleName: sessionUserMetaData["middle_name"],
          lastName: sessionUserMetaData["last_name"],
          suffix: sessionUserMetaData["suffix"],
          birthday: sessionUserMetaData["birth_date"],
          phone: sessionUserMetaData["phone_number"],
          barangay: sessionUserMetaData["barangay"],
          street: sessionUserMetaData["street"],
          houseNumber: sessionUserMetaData["house_number"],
          email: sessionUserMetaData["email"],
        },
      });
      set({ session: data.session });
      await largeSecureStore.setItem("session", JSON.stringify(data.session));
    }
  },
  restoreSessionOffline: async () => {
    const largeSecureStore = new LargeSecureStore();

    const session = await largeSecureStore.getItem("session");
    if (session) {
      const sessionUserMetaData = session["user"]["user_metadata"];
      set({
        userMetaData: {
          firstName: sessionUserMetaData["first_name"],
          middleName: sessionUserMetaData["middle_name"],
          lastName: sessionUserMetaData["last_name"],
          suffix: sessionUserMetaData["suffix"],
          birthday: sessionUserMetaData["birth_date"],
          phone: sessionUserMetaData["phone_number"],
          barangay: sessionUserMetaData["barangay"],
          street: sessionUserMetaData["street"],
          houseNumber: sessionUserMetaData["house_number"],
          email: sessionUserMetaData["email"],
        },
      });
      set({ session: session });
    }
  },
  removeSession: async () => {
    set({ session: null });
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
  setResetPasswordSession: (value) => set({ resetPasswordSession: value }),
  removePasswordResetSession: () => {
    set({ resetPasswordSession: null });
  },
  resetSignup: () => {
    set({ signupForm: DEFAULT_SIGNUP_FORM });
    set({ signupCurrentStep: 0 });
  },
  setUserMetaData: (value) => set({ userMetaData: value }),
  removeUserMetaData: () => set({ userMetaData: DEFAULT_SIGNUP_FORM }),
});
