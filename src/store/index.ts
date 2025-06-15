import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentSlice";
import paymentDetailReducer from "./paymentDetailSlice";

export const store = configureStore({
  reducer: {
    payments: paymentReducer,
    paymentDetail: paymentDetailReducer,

    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;