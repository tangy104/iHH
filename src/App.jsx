import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./states/AuthContext";
import Navbar from "./components/nav/Navbar";
import MainForm from "./pages/main/MainForm";
import VisualFetch from "./pages/visualFetch/VisualFetch";
import HospitalData from "./pages/hospital/hospitalData/HospitalData"
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
