import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/user.slice'
import paymentReducer from '../features/payment/paymentSlice'
import paymentDetailReducer from '../features/payment/paymentDetailSlice'
import authMiddleware from './middlewares/authMiddleware'
import memberReducer from '../store/memberSlice'
import yojnaRegistrationReducer from '../store/yojnaRegistrationSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentReducer,
    paymentDetail: paymentDetailReducer,
    members: memberReducer,
    yojnaRegistration: yojnaRegistrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
