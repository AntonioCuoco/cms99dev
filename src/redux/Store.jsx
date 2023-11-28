import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./slice/Login_slice.js"

export const store = configureStore({
  reducer: {
    loginSlice
  },
})