import { create } from 'zustand'

const useStore = create((set) => ({
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
}))

export default useStore
