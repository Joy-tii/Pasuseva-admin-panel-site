import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/store";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateMedicineForm from "./pages/medicine/CreateMedicineForm";
import MedicineList from "./pages/medicine/MedicineList";
import SellForm from "./pages/inventory/SellForm";
import SellHistory from "./pages/inventory/SellHistory";
import ProtectedLayout from "./layout/ProtectedLayout";
import { useEffect } from "react";
import PaymentList from "./pages/PaymentList";
import PaymentDetail from "./pages/PaymentDetail";
// import AnalystDashboard from "./pages/Dashboard/AnalystDashboard"; // Sahi path ka dhyan rakho
import YojnaList from "./pages/Yojna/YojnaList";
import AddYojna from "./pages/Yojna/AddYojna";
import CustomerList from "./pages/Customer/CustomerList";
import AddCustomer from "./pages/Customer/AddCustomer";
import MemberList from "./pages/Member/MemberList";
import AddMember from "./pages/Member/AddMember";

export default function App() {
  const isAuthenticated = true; //useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch({ type: 'auth/checkAuth' });
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Prevent authenticated users from accessing SignIn or SignUp */}
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected Routes */}
        {/* <Route element={<ProtectedLayout />}> */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/medicine/add" element={<CreateMedicineForm />} />
            <Route path="/medicine/list" element={<MedicineList />} />
            <Route path="/inventory" element={<SellForm />} />
            <Route path="/inventory/history" element={<SellHistory />} />
            <Route path="/payments/list" element={<PaymentList />} />
            <Route path="/payments/:id" element={<PaymentDetail />} />
            {/* <Route path="/dashboard/analyst" element={<AnalystDashboard />} /> */}
            <Route path="/yojna/list" element={<YojnaList />} />
            <Route path="/yojna/add" element={<AddYojna />} />
            <Route path="/customer/list" element={<CustomerList />} />
            <Route path="/customer/add" element={<AddCustomer />} />
            <Route path="/member/list" element={<MemberList />} />
            <Route path="/member/add" element={<AddMember />} />
          </Route>
        {/* </Route> */}

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
