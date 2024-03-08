import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import LandingPage from "./pages/landing/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import GroupForm from "./components/groups/GroupForm";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
