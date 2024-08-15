import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import MainForm from "./pages/main/MainForm";
import VisualFetch from "./pages/visualFetch/VisualFetch";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/form" element={<MainForm />} />
        <Route path="/analytics" element={<VisualFetch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
