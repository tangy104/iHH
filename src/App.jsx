import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./states/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/nav/Navbar";
import MainForm from "./pages/main/MainForm";
import VisualFetch from "./pages/visualFetch/VisualFetch";
import HospitalData from "./pages/hospital/hospitalData/HospitalData";
import ShopData from "./pages/shop/shopData/ShopData";
import Work from "./pages/work/employeeWork/Work";
import SignUp from "./pages/auth/signUp/SignUp";
import SignIn from "./pages/auth/signIn/SignIn";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<VisualFetch />} />
          <Route path="/form" element={<MainForm />} />
          <Route path="/analytics" element={<VisualFetch />} />
          <Route path="/signUp/:role" element={<SignUp />} />
          <Route path="/signIn/:role" element={<SignIn />} />
          <Route path="/hospitaldata/:type" element={<HospitalData />} />
          <Route path="/shopdata/:type" element={<ShopData />} />
          <Route path="/work" element={<Work />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
