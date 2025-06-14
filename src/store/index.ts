import { configureStore } from "@reduxjs/toolkit";
import paymentDetailReducer from "./paymentDetailSlice";

export const store = configureStore({
  reducer: {
    paymentDetail: paymentDetailReducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;