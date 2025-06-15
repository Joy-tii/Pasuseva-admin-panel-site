import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "../features/payment/paymentSlice";
import paymentDetailReducer from "../features/payment/paymentDetailSlice";

export const store = configureStore({
  reducer: {
    payments: paymentReducer,
    paymentDetail: paymentDetailReducer,

    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;