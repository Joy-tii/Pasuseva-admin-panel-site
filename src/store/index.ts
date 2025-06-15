import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentSlice";
import paymentDetailReducer from "./paymentDetailSlice";
import yojnaRegistrationReducer from "./yojnaRegistrationSlice";

import paymentReducer from "../features/payment/paymentSlice";
import paymentDetailReducer from "../features/payment/paymentDetailSlice";

export const store = configureStore({
  reducer: {
    payments: paymentReducer,
    paymentDetail: paymentDetailReducer,
 yojnaRegistration: yojnaRegistrationReducer,
    // ...other reducers
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;