import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/user.slice'
import paymentReducer from '../features/payment/paymentSlice'
import paymentDetailReducer from '../features/payment/paymentDetailSlice'
import authMiddleware from './middlewares/authMiddleware'
import memberReducer from '../store/memberSlice'
import yojnaRegistrationReducer from '../store/yojnaRegistrationSlice';
import contactReducer from '../store/contactSlice';
import customerReducer from '../store/customerSlice';
import jobReducer from '../features/job-application/jobApplicationSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentReducer,
    paymentDetail: paymentDetailReducer,
    members: memberReducer,
    yojnaRegistration: yojnaRegistrationReducer,
    contacts: contactReducer,
    customer: customerReducer,
    job: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
