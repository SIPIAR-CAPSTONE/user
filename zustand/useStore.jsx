import { create } from 'zustand'
import { setItem, deleteItem } from '../utils/LocalStorage'
import { themeStatus } from '../utils/theme'

const useStore = create((set) => ({
  currentThemeStatus: themeStatus.dark,
  session: null,
  resetPasswordSession: null,
  appIsReady: false,
  signupFormOne: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: new Date(),
    phone: 0,
  },
  signupFormTwo: {
    barangay: '',
    street: '',
    houseNumber: '',
  },
  signupFormThree: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  passwordResetEmail: '',
  setSignupFormOne: (key, newValue) =>
    set((state) => ({
      signupFormOne: { ...state.signupFormOne, [key]: newValue },
    })),
  setSignupFormTwo: (key, newValue) =>
    set((state) => ({
      signupFormTwo: { ...state.signupFormTwo, [key]: newValue },
    })),
  setSignupFormThree: (key, newValue) =>
    set((state) => ({
      signupFormThree: { ...state.signupFormThree, [key]: newValue },
    })),
  setPasswordResetEmail: (email) => set(() => ({ email })),
  setThemeStatus: (newThemeStatus) => {
    if (newThemeStatus == null) {
      //if given new theme is null set current theme with light theme as default
      set({ currentThemeStatus: themeStatus.light })
    } else {
      //set new theme in state
      set({ currentThemeStatus: newThemeStatus })
      //set new theme in localStorage
      setItem('theme', newThemeStatus)
    }
  },
  setSession: (encryptedSession) => {
    set({ session: encryptedSession })
  },
  removeSession: () => {
    set({ session: null })
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
  setResetPasswordSession: (value) => set({ resetPasswordSession: value }),
  removePasswordResetSession: () => { set({ resetPasswordSession: null })
  },
}))

export default useStore
